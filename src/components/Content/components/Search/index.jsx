import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { keys } from '../../../../store/search/constants';

import SearchInput from '../SearchInput';
import SearchFound from '../SearchFound';

const Search = ({ stylization, found }) => (
  <div className={classNames(stylization, 'search')}>
    <SearchInput stylization="search-input-area" />
    {(found.length)
      ? <SearchFound stylization="search-found-area" found={found} />
      : null}
  </div>
);

const shapeFound = {};

Search.propTypes = {
  stylization: PropTypes.string,
  found: PropTypes.arrayOf(PropTypes.shape(shapeFound)),
};

Search.defaultProps = {
  stylization: '',
  found: [],
};

const mapStateToProps = (state) => {
  const foundAreas = state.search.get(keys.foundAreas);
  const foundAreasData = state.search.get(keys.foundAreasData);
  return {
    found: foundAreas.map(id => ({
      id,
      data: foundAreasData.get(id),
    })).toArray(),
  };
};

export default connect(mapStateToProps)(Search);
