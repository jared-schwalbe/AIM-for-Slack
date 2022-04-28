import React from 'react';
import PropTypes from 'prop-types';
import bemmit from 'bemmit';

import './style.scss';

const c = bemmit('aim-for-slack--modal');

const Modal = ({ ask, setAsk, showAIM, showSlack }) => (
  <div className={c()}>
    <div className="c-sk-modal_portal">
      <div className="ReactModal__Overlay ReactModal__Overlay--after-open c-sk-overlay">
        <div className="ReactModal__Content ReactModal__Content--after-open c-sk-modal c-sk-modal--fixed">
          <div className="c-sk-modal_header">
            <div className="c-sk-modal_title_bar">
              <div className="c-sk-modal_title_bar__text">
                <h1>Welcome to AIM for Slack!</h1>
                <h4>Choose your experience</h4>
              </div>
            </div>
          </div>
          <div className="c-sk-modal_content">
            <div className={c('content')}>
              <div className={c('views')}>
                <div className={c('view', ['slack'])} onClick={showSlack} />
                <div className={c('view', ['aim'])} onClick={showAIM} />
              </div>
              <label className="c-label c-label--inline c-label--pointer">
                <span className="c-label__text">Ask me every time</span>
                <span className="c-label__children">
                  <input
                    checked={ask}
                    className="c-input_checkbox"
                    type="checkbox"
                    onChange={e => setAsk(e.target.checked)} />
                </span>
              </label>
            </div>
          </div>
          <button
            className="c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-sk-modal__close_button"
            onClick={showSlack}
            type="button"
          >
            <span
              role="img"
              data-3ev="close"
              className={c('close')}
              style={{ '--s': '20px' }}
            />
          </button>
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  ask: PropTypes.bool.isRequired,
  setAsk: PropTypes.func.isRequired,
  showAIM: PropTypes.func.isRequired,
  showSlack: PropTypes.func.isRequired,
}

export default Modal;
