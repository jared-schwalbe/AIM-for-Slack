// Select the node that will be observed for mutations
// const targetNode = document.querySelector('.c-mention_badge');
const messageList = document.querySelector('.c-virtual_list__scroll_container');

// Options for the observer (which mutations to observe)
const config = {
  subtree: true,
  characterData: true
};

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.target.parentElement.classList.contains('p-channel_sidebar__badge')) {
        console.warn('NEW MESSAGE IN COLLAPSED GROUP');
      }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(messageList, config);
