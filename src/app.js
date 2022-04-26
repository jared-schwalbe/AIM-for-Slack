import React from 'react'; 
import ReactDOM from 'react-dom'; 

import './desktop/WinXP/index.css'; 
import './desktop/assets/clear.css'; 
import './desktop/assets/font.css'; 
import Container from './Container';

window.aimForSlack = {
  signedIn: false,
  ignoreNextExpansion: {},
};

const div = document.createElement('div');
div.id = 'aim-for-slack';
document.body.appendChild(div);

// chrome.storage.sync.clear();
chrome.storage.sync.get(['view'], function(result) {
  if (result.view !== 'aim') {
    document.body.style.visibility = 'visible';
  }
  if (!result.view) {
    document.addEventListener("DOMNodeInserted", (e) => {
      if (e.target.classList && e.target.classList.contains('p-client')) {
        ReactDOM.render(<Container initialView={result.view} />, document.getElementById('aim-for-slack'));
      }
    }, true);
  } else {
    ReactDOM.render(<Container initialView={result.view} />, document.getElementById('aim-for-slack'));
  }
});
