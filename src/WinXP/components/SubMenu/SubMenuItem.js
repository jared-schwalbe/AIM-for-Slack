import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SubMenu from './';

const SubMenuItem = ({ className, hover, index, item, onClick, onHover }) => {
  const _onMouseOver = () => {
    onHover(index);
  };

  const _onClick = () => {
    onClick(item.text);
  };

  switch (item.type) {
    case 'item':
      return (
        <div
          onClick={_onClick}
          onMouseEnter={_onMouseOver}
          className={`${className} item`}
        >
          <img className={`${className} img`} src={item.icon} alt="" />
          <div className={`${className} text`}>{item.text}</div>
        </div>
      );
    case 'separator':
      return <div className={`${className} separator`} />;
    case 'menu':
      return (
        <div
          onMouseEnter={_onMouseOver}
          className={`${className} item ${hover ? 'hover' : ''}`}
        >
          <img className={`${className} img`} src={item.icon} alt="" />
          <div className={`${className} text`}>{item.text}</div>
          <div className={`${className} arrow`}>
            {hover && (
              <SubMenu
                data={item.items}
                bottom={item.bottom}
                onClick={onClick}
              />
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
};

SubMenuItem.propTypes = {
  className: PropTypes.string.isRequired,
  hover: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    text: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
};

export default styled(SubMenuItem)`
  &.separator {
    padding: 0 5px;
    height: 2px;
    box-shadow: inset 3px 0 #4081ff;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }
  &.item {
    height: 25px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-shadow: inset 3px 0 #4081ff;
    position: relative;
    padding-right: 22px;
    color: black;
  }
  &.item.hover {
    background-color: #1b65cc;
    color: white;
  }
  &.item:hover {
    background-color: #1b65cc;
    color: white;
    &-arrow:before {
      border-left-color: #fff;
    }
  }
  &.item:hover,
  &-item.hover > &-arrow:before {
    border-left-color: #fff;
  }
  &.img {
    margin-right: 6px;
    width: 16px;
    height: 16px;
  }
  &.text {
    font-size: 11px;
    white-space: nowrap;
  }
  &.arrow {
    position: absolute;
    right: 0;
    height: 100%;
    width: 10px;
    &:before {
      top: 9px;
      right: 6px;
      content: '';
      display: block;
      border: 4px solid transparent;
      border-right: 0;
      border-left-color: #000;
      position: absolute;
    }
  }
`;
