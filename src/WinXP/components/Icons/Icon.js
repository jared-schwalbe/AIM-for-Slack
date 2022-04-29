import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import shortcut from '../../assets/icons/shortcut.png';

const Icon = ({
  className,
  component,
  displayFocus,
  getComponent,
  icon,
  id,
  isFocus,
  isShortcut,
  measure,
  onDoubleClick,
  onMouseDown,
  style = {},
  title,
}) => {
  const ref = useRef(null);

  const _onMouseDown = () => {
    onMouseDown(id);
  };

  const _onDoubleClick = () => {
    onDoubleClick(id, component ?? getComponent());
  };

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }
  
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const posX = left + window.scrollX;
    const posY = top + window.scrollY;
    measure({ id, x: posX, y: posY, w: width, h: height });
  }, [id, measure]);

  return (
    <div
      className={className}
      onMouseDown={_onMouseDown}
      onDoubleClick={_onDoubleClick}
      ref={ref}
      style={style}
    >
      <div className="img__container">
        <img src={icon} alt={title} className="img" />
        {isShortcut && <img src={shortcut} alt="" className="shortcut" />}
      </div>
      <div className="text__container">
        <div className="text">{title}</div>
      </div>
    </div>
  );
};

Icon.defaultProps = {
  component: null,
  displayFocus: false,
  getComponent: () => {},
  isFocus: false,
  isShortcut: false,
  style: {},
};

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  component: PropTypes.func,
  displayFocus: PropTypes.bool,
  getComponent: PropTypes.func,
  icon: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isFocus: PropTypes.bool,
  isShortcut: PropTypes.bool,
  measure: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default styled(Icon)`
  width: 70px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text__container {
    width: 100%;
    font-size: 10px;
    color: white;
    text-shadow: 0 1px 1px black;
    margin-top: 5px;
    display: flex;
    justify-content: center;

    &:before {
      content: '';
      display: block;
      flex-grow: 1;
    }
    &:after {
      content: '';
      display: block;
      flex-grow: 1;
    }
  }
  .text {
    padding: 0 3px 2px;
    background-color: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? '#0b61ff' : 'transparent'};
    text-align: center;
    flex-shrink: 1;
  }
  .img__container {
    position: relative;
    width: 30px;
    height: 30px;
    filter: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? 'drop-shadow(0 0 blue)' : ''};
  }
  .img {
    width: 30px;
    height: 30px;
    opacity: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? 0.5 : 1};
  }
  .shortcut {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 11px;
  }
`;
