import React from 'react';
import ReactDOM from 'react-dom';

import './desktop/WinXP/index.css';
import './desktop/assets/clear.css';
import './desktop/assets/font.css';
import Modal from './Modal';

const div = document.createElement('div');
div.id = 'aim-for-slack';
document.body.appendChild(div);

document.addEventListener("DOMNodeInserted", (e) => {
  if (e.target.classList && e.target.classList.contains('p-client')) {
    ReactDOM.render(<Modal />, document.getElementById('aim-for-slack'));
  }
}, true);
