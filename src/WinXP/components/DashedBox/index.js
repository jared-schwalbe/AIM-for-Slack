import React from 'react';
import PropTypes from 'prop-types';

const DashedBox = ({ mouse, startPos }) => {
  const getRect = () => {
    return {
      x: Math.min(startPos.x, mouse.docX),
      y: Math.min(startPos.y, mouse.docY),
      w: Math.abs(startPos.x - mouse.docX),
      h: Math.abs(startPos.y - mouse.docY),
    };
  }

  if (startPos) {
    const { x, y, w, h } = getRect();
    return (
      <div
        style={{
          transform: `translate(${x}px,${y}px)`,
          width: w,
          height: h,
          position: 'absolute',
          border: `1px dotted gray`,
        }}
      />
    );
  }

  return null;
};

DashedBox.defaultProps = {
  startPos: null,
};

DashedBox.propTypes = {
  mouse: PropTypes.shape({
    docX: PropTypes.number.isRequired,
    docY: PropTypes.number.isRequired,
  }).isRequired,
  startPos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

export default DashedBox;
