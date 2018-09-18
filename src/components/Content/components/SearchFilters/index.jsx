import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const SearchFilters = ({ stylization }) => (
  <div className={classNames(stylization, 'search-filters')} />
);

SearchFilters.propTypes = {
  stylization: PropTypes.string,
};

SearchFilters.defaultProps = {
  stylization: '',
};

export default SearchFilters;
