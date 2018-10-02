import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import FoundElement from '../FoundElement';

const SearchFound = ({ stylization, found, onRequestDetails }) => (
  <div className={classNames(stylization, 'search-found')}>
    {found.map(({ id, data }) => (
      <FoundElement
        key={id}
        stylization="search-found-element"
        data={data}
        onRequestDetails={() => onRequestDetails(id)}
      />
    ))}
  </div>
);

const shapeFound = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
};

SearchFound.propTypes = {
  stylization: PropTypes.string,
  found: PropTypes.arrayOf(PropTypes.shape(shapeFound)).isRequired,
  onRequestDetails: PropTypes.func,
};

SearchFound.defaultProps = {
  stylization: '',
  onRequestDetails: () => {},
};

export default SearchFound;
