import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FooterIcon = ({ alt, className, src }) => (
  <img className={className} alt={alt} src={src} />
);

FooterIcon.defaultProps = {
  alt: '',
};

FooterIcon.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string.isRequired,
  src: PropTypes.string,
};

export default styled(FooterIcon)`
  height: 15px;
  width: 15px;
  margin: 0 1px;
`;
