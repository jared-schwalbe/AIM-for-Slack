// returns true if a child of the sidebar list is a group
function isGroup(item) {
  return (
    item?.classList?.contains('p-channel_sidebar__static_list__item')
      && item?.id?.includes('sectionHeading')
  );
}

// returns true if a child of the sidebar list is a channel
function isChannel(item) {
  return (
    item?.classList?.contains('p-channel_sidebar__static_list__item')
      && !item?.id?.includes('sectionHeading')
  );
}

// returns true if a group is expanded
function isGroupExpanded(group) {
  return group.getAttribute('aria-expanded') === 'true';
}

// returns true if a group is collapsed
function isGroupCollapsed(group) {
  return group.getAttribute('aria-expanded') === 'false';
}

// return the sidebar list element
function getSidebarList() {
  return document.querySelector('.p-channel_sidebar__list .c-virtual_list__scroll_container');
}

// expand a group and return if we were successful
function expandGroup(group) {
  if (isGroupExpanded(group)) {
    return false;
  }

  const sectionHeading = group.querySelector('.p-channel_sidebar__section_heading_label_overflow');
  if (sectionHeading) {
    // inform the buddy list not to mirror this expansion
    window.aimForSlack.ignoreNextExpansion[group.id] = true;
    sectionHeading.click();
    return true;
  }

  return false;
}

// collapse a group and return if we were successful
function collapseGroup(group) {
  if (!isGroupExpanded(group)) {
    return false;
  }

  const sectionHeading = group.querySelector('.p-channel_sidebar__section_heading_label_overflow');
  if (sectionHeading) {
    sectionHeading.click();
    return true;
  }

  return false;
}

// listen for the addition of new channels as a result of expanding a group in the getMentions function
function createGroupMentionsObserver(mentions) {
  const callback = (mutationsList, observer) => {
    const clicked = {};

    for (const mutation of mutationsList) {
      if (isChannel(mutation.addedNodes?.[0])) {
        // traverse up the sidebar list to look for the group this channel belongs to
        let item = mutation.previousSibling;
        while (item && !isGroup(item)) {
          item = item.previousSibling;
        }
        if (item && !clicked[item.id]) {
          clicked[item.id] = true;
          collapseGroup(item);
        }
        // set the mentions for this channel
        const channelName = mutation.addedNodes[0].querySelector('.p-channel_sidebar__name');
        const mentionBadge = mutation.addedNodes[0].querySelector('.c-mention_badge');
        if (channelName && mentionBadge) {
          mentions[channelName.textContent] = Number(mentionBadge.textContent);
        }
      }
    }

    observer.disconnect();
  };

  return new MutationObserver(callback);
}

// set up and return an object to track [channelName]: mentions
function getMentions() {
  const mentions = {};

  // set up an observer to watch for new sidebar items
  const groupMentionsObserver = createGroupMentionsObserver(mentions);
  groupMentionsObserver.observe(getSidebarList(), { childList: true });

  let checkCollapsedGroup = false;
  const sidebarChannels = [...document.querySelectorAll('.p-channel_sidebar__static_list__item')];
  sidebarChannels.forEach(item => {
    if (isChannel(item)) {
      // channels: check mentions badge
      const channelName = item.querySelector('.p-channel_sidebar__name');
      const mentionBadge = item.querySelector('.c-mention_badge');
      if (channelName && mentionBadge) {
        mentions[channelName.textContent] = Number(mentionBadge.textContent);
      }
    } else if (isGroup(item) && isGroupCollapsed(item)) {
      // collapsed groups: expand, let observer count mentions, then collapse again
      checkCollapsedGroup = true;
      expandGroup(item);
    }
  });

  if (!checkCollapsedGroup) {
    groupMentionsObserver.disconnect();
  }

  return mentions;
}

// TODO: I don't think this will work if two collapsed groups get a mention at the same time
// watch for new mentions in the sidebar and dispatch a new message action when we find one
export default function createNewMentionsObserver(dispatchNewMessage) {
  const mentions = getMentions();

  let groupWithMentions = null;
  let checkingGroupMentions = false;

  const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {

      // check for new or removed mentions in a channel
      // ----------------------------------------------
      if (
        mutation.type === 'childList'
        && (mutation.addedNodes?.[0]?.classList?.contains('c-mention_badge')
          || mutation.removedNodes?.[0]?.classList?.contains('c-mention_badge'))
        && (
          mutation.target.classList.contains('p-channel_sidebar__channel')
          || mutation.target.firstChild.classList.contains('p-channel_sidebar__channel')
        )
      ) {
        const channelName = mutation.target.querySelector('.p-channel_sidebar__name');
        const mentionBadge = mutation.target.querySelector('.c-mention_badge');
        if (channelName) {
          if (mutation.addedNodes.length) {
            mentions[channelName.textContent] = Number(mentionBadge.textContent);
            const sidebarChannel = mutation.addedNodes[0].closest('.p-channel_sidebar__static_list__item');
            let sidebarGroup = sidebarChannel.previousSibling;
            while (sidebarGroup && !isGroup(sidebarGroup)) {
              sidebarGroup = sidebarGroup.previousSibling;
            }
            dispatchNewMessage({
              channelName: channelName.textContent,
              sidebarChannel,
              sidebarGroup,
            });
          } else {
            delete mentions[channelName.textContent];
          }
        }
        continue;
      }

      // check for new or removed mentions in a collapsed group
      // then expand the group and mark that we've opened it
      // ------------------------------------------------------
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
        groupWithMentions = mutation.target.parentElement.closest('.p-channel_sidebar__static_list__item');
        expandGroup(groupWithMentions);
        continue;
      }

      // update the mentions for the channels that were added during a group expansion
      // -----------------------------------------------------------------------------
      if (groupWithMentions
        && mutation.type === 'childList'
        && mutation.addedNodes?.[0]?.classList?.contains('p-channel_sidebar__static_list__item')) {
        checkingGroupMentions = true;
        const channelName = mutation.addedNodes[0].querySelector('.p-channel_sidebar__name');
        const mentionBadge = mutation.addedNodes[0].querySelector('.c-mention_badge');
        if (channelName) {
          if (mentionBadge) {
            const oldValue = mentions[channelName.textContent];
            mentions[channelName.textContent] = Number(mentionBadge.textContent);
            if (!oldValue || (Number(mentionBadge.textContent) > oldValue)) {
              let sidebarGroup = mutation.previousSibling;
              while (sidebarGroup && !isGroup(sidebarGroup)) {
                sidebarGroup = sidebarGroup.previousSibling;
              }
              dispatchNewMessage({
                channelName: channelName.textContent,
                sidebarChannel: mutation.addedNodes[0],
                sidebarGroup,
              });
            }
          } else {
            delete mentions[channelName.textContent];
          }
        }
      }
    }

    // we are done processing the items added after expanding a group
    // so now we can collapse it again and reset
    if (checkingGroupMentions) {
      checkingGroupMentions = false;
      collapseGroup(groupWithMentions);
      groupWithMentions = null;
    }
  };

  return new MutationObserver(callback);
}
