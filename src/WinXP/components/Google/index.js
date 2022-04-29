import React from 'react';
import PropTypes from 'prop-types';

import Search from './Search';
import Main from './Main';

const Google = ({ goMain, onSearch, query, route }) => {
  if (route === 'main') {
    return <Main onSearch={onSearch} />;
  }

  return <Search goMain={goMain} onSearch={onSearch} query={query} />;
};

Google.defaultProps = {
  query: '',
  route: 'main',
};

Google.propTypes = {
  goMain: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  query: PropTypes.string,
  route: PropTypes.string,
};

export default Google;
