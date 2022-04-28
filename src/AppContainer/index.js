import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import WinXP from '../WinXP';

import aimIcon from '../WinXP/assets/icons/aim.png';

const AppContainer = ({ viewPreference }) => {
  const [ask, setAsk] = useState(!viewPreference);
  const [view, setView] = useState(viewPreference);
  const [slackLoaded, setSlackLoaded] = useState(false);

  const showAIM = () => setView('AIM');
  const showSlack = () => setView('SLACK');

  useEffect(() => {
    if (!ask) {
      chrome.storage.sync.set({ view });
    }
  }, [ask, view]);

  useEffect(() => {
    document.body.style.visibility = 'visible';
  }, []);

  useEffect(() => {
    const div = document.createElement('div');
    div.className = 'p-top_nav__windows_controls';

    const button = document.createElement('button');
    button.className = 'aim-for-slack--launcher c-button-unstyled p-top_nav__button';
    button.addEventListener('click', showAIM);

    const img = document.createElement('img');
    img.src = aimIcon;
    img.height = "18";

    button.append(img);
    div.append(button);

    // if slack is already loaded, insert the button into the top-right nav
    // otherwise, wait for slack to load before inserting it
    const navRight = document.querySelector('.p-client .p-top_nav__right');
    if (navRight) {
      setSlackLoaded(true);
      navRight.prepend(div);
    } else {
      const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.addedNodes?.[0]?.classList?.contains('p-client')) {
            setSlackLoaded(true);
            mutation.addedNodes[0].querySelector('.p-top_nav__right').prepend(div);
            observer.disconnect();
          }
        }
      });
      const slackContainer = document.querySelector('.p-client_container');
      observer.observe(slackContainer, { childList: true });
    }
  }, []);

  if (view === 'SLACK') {
    return null;
  }

  if (view === 'AIM') {
    return <WinXP onClose={showSlack} />;
  }

  if (slackLoaded) {
    return (
      <Modal
        ask={ask}
        setAsk={setAsk}
        showAIM={showAIM}
        showSlack={showSlack}
      />
    );
  }

  return null;
};

AppContainer.defaultProps = {
  viewPreference: '',
};

AppContainer.propTypes = {
  viewPreference: PropTypes.oneOf(['AIM', 'SLACK', '']),
};

export default AppContainer;
