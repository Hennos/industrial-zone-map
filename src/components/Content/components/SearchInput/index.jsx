import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import SearchFilters from '../SearchFilters';

const SearchInput = ({ stylization }) => (
  <div className={classNames(stylization, 'search-input')}>
    <input className="search-string" placeholder="Поиск" type="text" />
    <div className="search-buttons" />
    <SearchFilters stylization="search-filters" />
  </div>
);

SearchInput.propTypes = {
  stylization: PropTypes.string,
};

SearchInput.defaultProps = {
  stylization: '',
};

export default SearchInput;
