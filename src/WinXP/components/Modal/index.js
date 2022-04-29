import React from 'react';
import { createPortal } from 'react-dom';

import Container from './Container';
import Menu from './Menu';

const Modal = (props) => {
  return createPortal(
    <Container>
      <Menu {...props} />
    </Container>,
    document.getElementById('win-xp'),
  );
};

export default Modal;
