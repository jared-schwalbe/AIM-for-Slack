import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SubMenuItem from './SubMenuItem';

const SubMenu = ({ className, data, onClick, style }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <div className={className} style={{ ...style }}>
      {data.map((item, index) => (
        <SubMenuItem
          key={index}
          hover={hoverIndex === index}
          index={index}
          item={item}
          onClick={onClick}
          onHover={setHoverIndex}
        />
      ))}
    </div>
  );
};

SubMenu.defaultProps = {
  style: {},
};

SubMenu.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default styled(SubMenu)`
  position: absolute;
  z-index: 99999;
  left: ${({ left }) => left || '100%'};
  bottom: ${({ bottom }) => bottom || '-1px'};
  background-color: white;
  padding-left: 1px;
  box-shadow: inset 0 0 0 1px #72ade9, 2px 3px 3px rgb(0, 0, 0, 0.5);
`;
