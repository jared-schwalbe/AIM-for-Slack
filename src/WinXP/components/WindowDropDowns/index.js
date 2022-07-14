import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WindowDropDown from './WindowDropDown';

const WindowDropDowns = ({ className, height, items, onClickItem }) => {
  const dropDown = useRef(null);
  const [openOption, setOpenOption] = useState('');

  const hoverOption = (option) => {
    if (openOption) {
      setOpenOption(option);
    }
  };

  const _onClickItem = (name) => {
    setOpenOption('');
    onClickItem(name);
  };

  const onMouseUp = (e) => {
    if (!dropDown.current?.contains(e.target)) {
      setOpenOption('');
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', onMouseUp);

    return () => {
      window.removeEventListener('mousedown', onMouseUp);
    };
  }, []);

  return (
    <div className={className} ref={dropDown}>
      {Object.keys(items).map(name => (
        <div className="drop-down" key={name}>
          <div
            key={name}
            onMouseDown={() => {
              setOpenOption(name);
            }}
            onMouseEnter={() => hoverOption(name)}
            className={`drop-down__label ${
              openOption === name ? 'drop-down__label--active' : ''
            }`}
          >
            {name}
          </div>
          {openOption === name && (
            <WindowDropDown
              onClick={_onClickItem}
              items={items[name]}
              position={{ top: `${height}px`, left: '0' }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

WindowDropDowns.defaultProps = {
  height: 20,
};

WindowDropDowns.propTypes = {
  className: PropTypes.string.isRequired,
  height: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickItem: PropTypes.func.isRequired,
}

export default styled(WindowDropDowns)`
  display: inline-flex;
  height: ${({ height }) => height || 20}px;
  line-height: ${({ height }) => height || 20}px;
  position: relative;
  .drop-down {
    font-size: 11px;
    height: 100%;
    position: relative;
  }
  .drop-down__label--active {
    background-color: #1660e8;
    color: #fff;
  }
  .drop-down__label {
    padding: 0 7px;
    &:hover {
      background-color: #1660e8;
      color: #fff;
    }
  }
`;
