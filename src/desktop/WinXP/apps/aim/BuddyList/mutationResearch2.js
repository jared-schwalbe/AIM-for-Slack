// WILL UPDATE UNREADS
// STILL NEED TO INTIALIZE UNREADS THOUGH

const messageList = document.querySelector('.c-virtual_list__scroll_container');

const config = {
  characterData: true,
  childList: true,
  subtree: true,
};

const unreads = {};
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
      console.warn(mutation);
      const channel = mutation.target.querySelector('.p-channel_sidebar__name');
      if (channel) {
        if (mutation.addedNodes.length) {
          unreads[channel.textContent] = 1;
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
          unreads[channel.textContent] = Number(badge.textContent);
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

const observer = new MutationObserver(callback);

observer.observe(messageList, config);
