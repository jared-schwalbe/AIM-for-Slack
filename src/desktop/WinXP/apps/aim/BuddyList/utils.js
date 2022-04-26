function createObserver(updateCount) {
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.target.getAttribute('aria-expanded') === 'true') {
        const groupId = mutation.target.id;
        const count = mutation.target.nextSibling.getAttribute('aria-setsize');
        updateCount(groupId, count);
        mutation.target.querySelector('.p-channel_sidebar__section_heading_label_overflow').click();
      }
    }
    observer.disconnect();
  }

  return new MutationObserver(callback);
}

export function getHiddenCounts(updateCount) {
  const observer = createObserver(updateCount);

  const sidebarList = document.querySelector('.c-virtual_list__scroll_container');
  observer.observe(sidebarList, {
    attributes: true,
    attributeFilter: ['aria-expanded'],
    subtree: true,
  });

  const sidebarItems = document.querySelectorAll('.p-channel_sidebar__static_list__item');

  let collpasedCount = 0;
  Array.from(sidebarItems).forEach(item => {
    if (item.id && item.id.includes('sectionHeading') && item.getAttribute('aria-expanded') === 'false') {
      collpasedCount++;
      window.aimForSlack.ignoreNextExpansion[item.id] = true;
      item.querySelector('.p-channel_sidebar__section_heading_label_overflow').click();
    }
  });

  if (!collpasedCount) {
    observer.disconnect();
  }
}
