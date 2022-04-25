function checkCollapsedGroupUnreads(toggleGroupExpanded, addUnread) {
  let checkingItems = false;

  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.addedNodes?.[0]?.classList?.contains('p-channel_sidebar__static_list__item')) {
        checkingItems = true;
        const channel = mutation.addedNodes[0].querySelector('.p-channel_sidebar__name');
        const badge = mutation.addedNodes[0].querySelector('.c-mention_badge');
        if (channel && badge) {
          addUnread(channel.textContent,  Number(badge.textContent));
        }
      }
    }
    if (checkingItems) {
      checkingItems = false;
      toggleGroupExpanded();
      observer.disconnect();
    }
  }

  const groupUnreadsObserver = new MutationObserver(callback);

  const sidebarList = document.querySelector('.c-virtual_list__scroll_container');
  groupUnreadsObserver.observe(sidebarList, {
    childList: true,
    subtree: true,
  });

  toggleGroupExpanded();
}

export function getUnreads() {
  const unreads = {};
  const addUnread = (channel, count) => unreads[channel] = count;

  const sidebarItems = document.querySelectorAll('.p-channel_sidebar__static_list__item');

  Array.from(sidebarItems).forEach(item => {
    if (item.querySelector('.p-channel_sidebar__channel')) {
      // channels: check unread badge
      const channel = item.querySelector('.p-channel_sidebar__name');
      const badge = item.querySelector('.c-mention_badge');
      if (channel && badge) {
        addUnread(channel.textContent, Number(badge.textContent));
      }
    } else if (item.id && item.id.includes('sectionHeading') && item.getAttribute('aria-expanded') === 'false') {
      // collapsed groups: expand, check unread badges, collapse
      const heading = item.querySelector('.p-channel_sidebar__section_heading_label_overflow');
      const toggleGroupExpanded = () => heading.click();
      checkCollapsedGroupUnreads(toggleGroupExpanded, addUnread);
    }
  });

  console.warn('unreads: ', unreads);

  return unreads;
}

export function createNewMessageObserver(unreads, dispatchNewMessage) {
  let groupToWatch = null;
  let watchItems = false;
  let checkingItems = false;

  const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {
      // CHECK FOR NEW OR REMOVED MENTIONS IN CHANNEL
      if (
        mutation.type === 'childList'
        && (mutation.addedNodes?.[0]?.classList?.contains('c-mention_badge')
          || mutation.removedNodes?.[0]?.classList?.contains('c-mention_badge'))
        && (
          mutation.target.classList.contains('p-channel_sidebar__channel')
          || mutation.target.firstChild.classList.contains('p-channel_sidebar__channel')
        )
      ) {
        const channel = mutation.target.querySelector('.p-channel_sidebar__name');
        if (channel) {
          if (mutation.addedNodes.length) {
            unreads[channel.textContent] = 1;
            console.warn('new message! 1');
            dispatchNewMessage({
              // TODO: the sidebarElement may not exist in rare cases...
              // like if this window is open but not focused and then the group gets collapsed
              channel: channel.textContent,
              sidebarElement: mutation.target,
            });
          } else {
            delete unreads[channel.textContent];
          }
        }
      }
      // CHECK FOR ADDED OR REMOVED MENTIONS IN COLLAPSED GROUP
      if (
        (mutation.type === 'childList'
          && mutation.addedNodes?.[0]?.classList?.contains('p-channel_sidebar__section_heading_right_item')
          && mutation.addedNodes?.[0]?.querySelector('.c-mention_badge'))
        || (mutation.type === 'childList'
          && mutation.removedNodes?.[0]?.classList?.contains('c-mention_badge')
          && mutation.target.closest('.p-channel_sidebar__section_heading--collapsed'))
        || (mutation.type === 'characterData'
          && mutation.target.parentElement.classList.contains('p-channel_sidebar__badge'))
      ) {
        groupToWatch = mutation.target.parentElement.closest('.c-virtual_list__item').querySelector('.p-channel_sidebar__section_heading_label_overflow');
        groupToWatch.click();
        watchItems = true;
      }
      // UPDATE COLLAPSED GROUP'S UNREADS
      if (watchItems
        && mutation.type === 'childList'
        && mutation.addedNodes?.[0]?.classList?.contains('p-channel_sidebar__static_list__item')) {
        checkingItems = true;
        const channel = mutation.addedNodes[0].querySelector('.p-channel_sidebar__name');
        const badge = mutation.addedNodes[0].querySelector('.c-mention_badge');
        if (channel) {
          if (badge) {
            const oldValue = unreads[channel.textContent];
            unreads[channel.textContent] = Number(badge.textContent);
            if (oldValue !== Number(badge.textContent)) {
              console.warn('new message! 2');
              dispatchNewMessage({
                // TODO: expand group, click, then recollapse
                // otherwise the sidebarElement won't exist by the time we try to click it!
                channel: channel.textContent,
                sidebarElement: mutation.addedNodes[0].firstChild,
              });
            }
          } else {
            delete unreads[channel.textContent];
          }
        }
      }
    }
    if (checkingItems) {
      watchItems = false;
      checkingItems = false;
      groupToWatch.click();
      groupToWatch = null;
    }
  };

  return new MutationObserver(callback);
}
