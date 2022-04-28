import React from 'react'; 
import ReactDOM from 'react-dom'; 

import AppContainer from './AppContainer';

window.aimForSlack = {
  // keep track of whether AIM is signed in
  // this will assist with the AIM desktop icon behavior
  signedIn: false,
  // the buddy list is set up to mirror the slack sidebar
  // if we need to quickly expand and collapse a group to see the children
  // then we can tell the buddy list to ignore the next expansion it observes
  // note: the keys in this object will be the IDs of the sidebar groups
  ignoreNextExpansion: {},
};

// we'll render all our react components here
const div = document.createElement('div');
div.id = 'aim-for-slack';
document.body.appendChild(div);

// fetch the user's preference for which view to show
chrome.storage.sync.get(['view'], result => {
  if (result.view !== 'AIM') {
    document.body.style.visibility = 'visible';
  }
  ReactDOM.render(
    <AppContainer viewPreference={result.view} />,
    document.getElementById('aim-for-slack'),
  );
});
