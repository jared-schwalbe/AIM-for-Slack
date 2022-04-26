function createGroupUnreadsObserver(addUnread) {
  const callback = function (mutationsList, observer) {
    const clicked = {};
    for (const mutation of mutationsList) {
      if (mutation.addedNodes?.[0]?.classList?.contains('p-channel_sidebar__static_list__item')) {
        let group = mutation.previousSibling;
        while (group && !group.id.includes('sectionHeading')) {
          group = group.previousSibling;
        }
        if (group && group.id.includes('sectionHeading') && !clicked[group.id]) {
          clicked[group.id] = true;
          group.querySelector('.p-channel_sidebar__section_heading_label_overflow').click();
        }
        const channel = mutation.addedNodes[0].querySelector('.p-channel_sidebar__name');
        const badge = mutation.addedNodes[0].querySelector('.c-mention_badge');
        if (channel && badge) {
          addUnread(channel.textContent,  Number(badge.textContent));
        }
      }
    }
    observer.disconnect();
  }

  return new MutationObserver(callback);
}

export function getUnreads() {
  const unreads = {};
  const addUnread = (channel, count) => {
    unreads[channel] = count;
  };

  const groupUnreadsObserver = createGroupUnreadsObserver(addUnread);

  const sidebarList = document.querySelector('.c-virtual_list__scroll_container');
  groupUnreadsObserver.observe(sidebarList, {
    childList: true,
    subtree: true,
  });

  const sidebarItems = document.querySelectorAll('.p-channel_sidebar__static_list__item');

  let collpasedCount = 0;
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
      collpasedCount++;
      window.aimForSlack.ignoreNextExpansion[item.id] = true;
      item.querySelector('.p-channel_sidebar__section_heading_label_overflow').click();
    }
  });

  if (!collpasedCount) {
    groupUnreadsObserver.disconnect();
  }

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
            const sidebarItem = mutation.addedNodes[0].closest('.p-channel_sidebar__static_list__item');
            let sidebarGroup = mutation.addedNodes[0].closest('.p-channel_sidebar__static_list__item');
            while (sidebarGroup && !sidebarGroup.id?.includes('sectionHeading')) {
              sidebarGroup = sidebarGroup.previousSibling;
            }
            dispatchNewMessage({
              channelName: channel.textContent,
              sidebarItem,
              sidebarGroup,
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
        const group = mutation.target.parentElement.closest('.p-channel_sidebar__static_list__item');
        groupToWatch = group.querySelector('.p-channel_sidebar__section_heading_label_overflow');
        window.aimForSlack.ignoreNextExpansion[group.id] = true;
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
            if (!oldValue || (Number(badge.textContent) > oldValue)) {
              let sidebarGroup = mutation.previousSibling;
              while (sidebarGroup && !sidebarGroup.id?.includes('sectionHeading')) {
                sidebarGroup = sidebarGroup.previousSibling;
              }
              dispatchNewMessage({
                channelName: channel.textContent,
                sidebarItem: mutation.addedNodes[0],
                sidebarGroup,
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
