import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import slackPreview from './slack-preview.png';
import aimPreview from './aim-preview.png';
import aimIcon from './desktop/assets/windowsIcons/aim.png';
import WinXP from './desktop/WinXP';

function Modal({ className }) {
  const [view, setView] = useState();

  useEffect(() => {
    const div = document.createElement('div');
    div.className = 'p-top_nav__windows_controls';
    const button = document.createElement('button');
    button.className = 'c-button-unstyled p-top_nav__button aim__launcher';
    button.addEventListener('click', () => {
      setView('aim');
    });
    const img = document.createElement('img');
    img.src = aimIcon;
    img.height = "18";
    button.append(img);
    div.append(button);
    document.querySelector('.p-top_nav__right').prepend(div);
  }, []);

  if (view === 'slack') {
    return null;
  }
  if (view === 'aim') {
    return <WinXP onClose={() => setView('slack')} />;
  }

  return (
    <div className={`${className} c-sk-modal_portal`}>
      <div className="ReactModal__Overlay ReactModal__Overlay--after-open c-sk-overlay">
        <div className="ReactModal__Content ReactModal__Content--after-open c-sk-modal c-sk-modal--fixed aim__modal">
          <div className="c-sk-modal_header">
            <div className="c-sk-modal_title_bar">
              <div className="c-sk-modal_title_bar__text">
                <h1>Welcome to AIM for Slack!</h1>
                <h4>Choose your experience</h4>
              </div>
            </div>
          </div>
          <div className="c-sk-modal_content">
            <div className="aim__modal__content">
              <div className="aim__modal__choose">
                <div className="aim__modal__item slack" onClick={() => setView('slack')} />
                <div className="aim__modal__item aim" onClick={() => setView('aim')} />
              </div>
              <label className="c-label c-label--inline c-label--pointer">
                <span className="c-label__text">Ask me every time</span>
                <span className="c-label__children">
                  <input name="aim_ask_everytime" type="checkbox" className="c-input_checkbox" checked={true} onChange={() => {}} />
                </span>
              </label>
            </div>
          </div>
          <button
            type="button"
            className="c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-sk-modal__close_button"
            onClick={() => setView('slack')}
          >
            <span role="img" data-3ev="close" className="aim__modal__close" style={{ '--s': '20px' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default styled(Modal)`
  h4 {
    color: #454545;
  }
  .aim__modal {
    max-width: 700px;
  }
  .aim__modal__content {
    padding: 19px 28px 40px;
    width: 100%;
  }
  .aim__modal__choose {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 39px;
  }
  .aim__modal__item {
    height: 190px;
    width: 306px;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 7px rgba(0,0,0,0.36);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 900;
    color: white;
    background-size:cover;
  }
  .aim__modal__item.aim {
    background: url(${aimPreview});
  }
  .aim__modal__item.aim:hover {
    background: url(${aimPreview}), linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45));
    background-blend-mode: overlay;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    cursor: pointer;
  }
  .aim__modal__item.aim:hover::before {
    content: 'AOL Instant Messenger';
  }
  .aim__modal__item.slack {
    background: url(${slackPreview});
  }
  .aim__modal__item.slack:hover {
    background: url(${slackPreview}), linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45));
    background-blend-mode: overlay;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    cursor: pointer;
  }
  .aim__modal__item.slack:hover::before {
    content: 'Regular Slack';
  }
`;
