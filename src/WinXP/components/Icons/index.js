import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Icon from './Icon';

const Icons = ({
  className,
  displayFocus,
  icons,
  mouse,
  onMouseDown,
  onDoubleClick,
  selecting,
  setSelectedIcons,
}) => {
  const [iconsRect, setIconsRect] = useState([]);

  const measure = (rect) => {
    if (iconsRect.find(r => r.id === rect.id)) {
      return;
    }
  
    setIconsRect(iconsRect => [...iconsRect, rect]);
  };

  useEffect(() => {
    if (!selecting) {
      return;
    }

    const sx = Math.min(selecting.x, mouse.docX);
    const sy = Math.min(selecting.y, mouse.docY);
    const sw = Math.abs(selecting.x - mouse.docX);
    const sh = Math.abs(selecting.y - mouse.docY);

    const selectedIds = iconsRect
      .filter(rect => {
        const { x, y, w, h } = rect;
        return x - sx < sw && sx - x < w && y - sy < sh && sy - y < h;
      })
      .map(icon => icon.id);

    setSelectedIcons(selectedIds);
  }, [iconsRect, setSelectedIcons, selecting, mouse.docX, mouse.docY]);

  return (
    <div className={className}>
      {icons.map(icon => (
        <Icon
          key={icon.id}
          {...icon}
          displayFocus={displayFocus}
          onMouseDown={onMouseDown}
          onDoubleClick={onDoubleClick}
          measure={measure}
        />
      ))}
    </div>
  );
};

export default styled(Icons)`
  position: absolute;
  margin-top: 30px;
  margin-left: 20px;
`;
