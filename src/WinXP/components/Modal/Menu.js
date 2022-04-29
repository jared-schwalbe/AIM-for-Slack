import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { POWER_STATE } from '../../constants';
import Button from './Button';

import windowsLogo from '../../assets/icons/windows-off.png';
import off from '../../assets/icons/310(32x32).png';
import lock from '../../assets/icons/546(32x32).png';
import restart from '../../assets/icons/restart.png';
import switcher from '../../assets/icons/290.png';

const Menu = ({ className, mode, onClose, onClickButton }) => {
  const renderButtons = () => {
    if (mode === POWER_STATE.TURN_OFF) {
      return (
        <>
          <Button disabled imgSrc={off} text="Stand By" />
          <Button imgSrc={off} text="Turn Off" onClick={onClickButton} />
          <Button
            imgSrc={restart}
            text="Restart"
            onClick={onClickButton}
            style={{ margin: '-3px 0 0px 0', width: '33px', height: '33px' }}
          />
        </>
      );
    }

    return (
      <>
        <Button
          imgSrc={switcher}
          text="Switch User"
          onClick={onClickButton}
          style={{ border: '1px solid #fff', borderRadius: '3px' }}
        />
        <Button imgSrc={lock} text="Log Off" onClick={onClickButton} />
      </>
    );
  };

  return (
    <div className={className}>
      <header className="header">
        <span className="header__text">Log Off Windows</span>
        <img src={windowsLogo} alt="" className="header__img" />
      </header>
      <div className="content">{renderButtons()}</div>
      <footer className="footer">
        <button onClick={onClose} className="footer__button">
          Cancel
        </button>
      </footer>
    </div>
  );
};

Menu.propTypes = {
  className: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired,
};

export default styled(Menu)`
  margin-top: 30vh;
  width: 300px;
  height: 190px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  .header {
    height: 42px;
    display: flex;
    padding-left: 10px;
    align-items: center;
    background: #092178;
  }
  .header__text {
    font-size: 17px;
    font-family: 'Noto Sans';
    color: #fff;
    flex: 1;
  }
  .header__img {
    width: auto;
    height: 30px;
    margin-right: 5px;
  }
  .content {
    flex: 1;
    background: linear-gradient(
      to right,
      #3349e0 0%,
      #617ee6 47%,
      #617ee6 53%,
      #3349e0 100%
    );
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 30px;
    position: relative;
    &:before {
      content: '';
      display: block;
      position: absolute;
      height: 2px;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(
        to right,
        transparent 0,
        rgba(255, 255, 255, 0.3) 40%,
        rgba(255, 255, 255, 0.3) 60%,
        transparent 100%
      );
    }
  }
  .footer {
    height: 42px;
    background: #092178;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .footer__button {
    font-size: 11px;
    padding: 0 8px;
    line-height: 10px;
    background: rgb(240, 240, 240);
    margin-right: 10px;
    height: 16px;
    border-radius: 1px;
    box-shadow: 2px 2px 4px 1px #0005b0, 2px 2px 2px 0px white,
      inset 0 0 0 1px skyblue, inset 2px -2px skyblue;
    border: none;
    outline: none;
    &:hover {
      box-shadow: 1px 1px black, 1px 1px 2px 0px white, inset 0 0 0 1px orange,
        inset 2px -2px orange;
    }
    &:hover:active {
      box-shadow: none;
      background: rgb(220, 220, 220);
    }
  }
`;
