import React from 'react';
import ReactDOM from 'react-dom';

import './desktop/WinXP/index.css';
import './desktop/assets/clear.css';
import './desktop/assets/font.css';
import WinXP from './desktop/WinXP';

(function() {
  const div = document.createElement('div');
  div.id = 'desktop-win-xp';
  document.body.appendChild(div);

  ReactDOM.render(<WinXP />, document.getElementById('desktop-win-xp'));
})();
