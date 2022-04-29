import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = ({ className, children }) => {
  const noop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={className}
      onMouseMove={noop}
      onClick={noop}
      onMouseDown={noop}
      onMouseUp={noop}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default styled(Container)`
  font-family: Tahoma, 'Noto Sans', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
`;
