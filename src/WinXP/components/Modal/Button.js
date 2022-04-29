import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ className, disabled, imgSrc, onClick, style, text }) => {
  const _onClick = () => {
    if (!disabled) {
      onClick(text);
    }
  };

  return (
    <div className={className}>
      <img
        alt={text}
        className="button-img"
        onClick={_onClick}
        src={imgSrc}
        style={{ ...style }}
      />
      <span className="button-text">{text}</span>
    </div>
  );
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  imgSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
};

export default styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ disabled }) => disabled ? 'gray' : 'white'};
  .button-img {
    height: 30px;
    width: 30px;
    opacity: ${({ disabled }) => disabled ? '0.3' : '1'};
    &:hover {
      filter: ${({ disabled }) => disabled ? 'none' : 'brightness(1.1)'};
    }
    &:hover:active {
      filter: ${({ disabled }) => disabled ? 'none' : 'brightness(0.7)'};
    }
  }
  .button-text {
    padding-top: 3px;
    font-weight: bold;
    font-size: 11px;
  }
`;
