import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import FoundElement from '../FoundElement';

const SearchFound = ({ stylization, found }) => (
  <div className={classNames(stylization, 'search-found')}>
    {found.map(element => <FoundElement key={element.id} stylization="search-found-element" data={element} />)}
  </div>
);

SearchFound.propTypes = {
  stylization: PropTypes.string,
  found: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SearchFound.defaultProps = {
  stylization: '',
};

export default SearchFound;
