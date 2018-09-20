import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import SearchFilters from '../SearchFilters';

const Button = () => (
  <div className="search-input-button" />
);

const SearchInput = ({ stylization }) => (
  <div className={classNames(stylization, 'search-input')}>
    <input className="search-input-string" placeholder="Поиск" type="text" />
    <Button />
    <Button />
    <SearchFilters stylization="search-input-filters" />
  </div>
);

SearchInput.propTypes = {
  stylization: PropTypes.string,
};

SearchInput.defaultProps = {
  stylization: '',
};

export default SearchInput;
