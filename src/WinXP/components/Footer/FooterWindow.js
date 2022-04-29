import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import FooterIcon from './FooterIcon';

const FooterWindow = ({
  className,
  hasNotification,
  icon,
  id,
  isFocus,
  onMouseDown,
  title,
}) => {
  const _onMouseDown = (e) => {
    e.stopPropagation();
    onMouseDown(id);
  }
  return (
    <div className={className} onMouseDown={_onMouseDown}>
      <FooterIcon src={icon} alt={title} />
      <div className="footer__text">{title}</div>
    </div>
  );
}

FooterWindow.defaultProps = {
  hasNotification: false,
  icon: null,
};

FooterWindow.propsTypes = {
  className: PropTypes.string.isRequired,
  hasNotification: PropTypes.bool,
  icon: PropTypes.string,
  id: PropTypes.number.isRequired,
  isFocus: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const footerBlink = keyframes`
  0%, 38% {
    background-color: #e27907;
  }
  39%, 52% {
    background-color: #3c81f3;
  }
  53%, 100% {
    background-color: #e27907;
  }
`;

export default styled(FooterWindow)`
  flex: 1;
  max-width: 150px;
  color: #fff;
  border-radius: 2px;
  margin-top: 2px;
  padding: 0 8px;
  height: 22px;
  font-size: 11px;
  background-color: #3c81f3;
  box-shadow: inset -1px 0px rgba(0, 0, 0, 0.3),
    inset 1px 1px 1px rgba(255, 255, 255, 0.2);
  position: relative;
  display: flex;
  align-items: center;
  animation: ${({ hasNotification }) => (hasNotification ? footerBlink : 'none')} 1.6s infinite;
  ${({ isFocus }) => (isFocus
    ? `
      background-color: #1e52b7;
      box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.2),
        inset 1px 0 1px rgba(0, 0, 0, 0.7);
      &:hover {
        background-color: #3576f3;
        &:active {
          background-color: #1e52b7;
        }
      }
    `
    : `
      &:before {
        display: block;
        content: '';
        position: absolute;
        left: -2px;
        top: -2px;
        width: 10px;
        height: 1px;
        border-bottom-right-radius: 50%;
        box-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
      }
      &:hover {
        background-color: #53a3ff;
        box-shadow: 1px 0px 1px rgba(0, 0, 0, 0.2),
          inset 1px 1px 1px rgba(255, 255, 255, 0.3);
        &:active {
          background-color: #1e52b7;
          box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
            inset 1px 0 1px rgba(0, 0, 0, 0.7);
        }
      }
    `
  )}
  .footer__text {
    position: absolute;
    left: 27px;
    right: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
