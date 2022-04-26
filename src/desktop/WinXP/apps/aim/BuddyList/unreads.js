// BELOW WILL DETECT A CHANNEL CHANGING FROM READ TO UNREAD(S) (not mentions)

const messageList = document.querySelector('.c-virtual_list__scroll_container');

const config = {
  attributes: true,
  attributeFilter: ['class'],
  attributeOldValue: true,
  subtree: true,
};

let expanded = null;
const unreads = {};
const callback = function(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.target.classList.contains('p-channel_sidebar__section_heading--unreads')
      && mutation.target.classList.contains('p-channel_sidebar__section_heading--collapsed')
      && !mutation.oldValue.includes('p-channel_sidebar__section_heading--unreads')) {
      mutation.target.querySelector('.p-channel_sidebar__section_heading_label_overflow').click();
      expanded = mutation.target.getAttribute('data-qa');
    }
    if (mutation.oldValue.includes('p-channel_sidebar__section_heading--collapsed')
      && !mutation.target.classList.contains('p-channel_sidebar__section_heading--collapsed')
      && mutation.target.getAttribute('data-qa') === expanded) {
        let item = mutation.target.parentElement.nextSibling;
        while (item.querySelector('.p-channel_sidebar__channel')) {
          const channel = item.querySelector('.p-channel_sidebar__name');
          const mentions = item.querySelector('.c-mention_badge');
          if (channel && mentions) {
            unreads[channel.textContent] = Number(mentions.textContent);
          }
          item = item.nextSibling;
        }
        expanded = null;
        mutation.target.querySelector('.p-channel_sidebar__section_heading_label_overflow').click();
    }
    if (mutation.target.classList.contains('p-channel_sidebar__channel--unread')
      && !mutation.oldValue.includes('p-channel_sidebar__channel--unread')) {
      const channel = mutation.target.querySelector('.p-channel_sidebar__name');
      if (channel) {
        unreads[channel.textContent] = 1;
      }
    }
    if (!mutation.target.classList.contains('p-channel_sidebar__channel--unread')
      && mutation.oldValue.includes('p-channel_sidebar__channel--unread')) {
      const channel = mutation.target.querySelector('.p-channel_sidebar__name');
      if (channel) {
        delete unreads[channel.textContent];
      }
    }
  }
};

const observer = new MutationObserver(callback);

observer.observe(messageList, config);
