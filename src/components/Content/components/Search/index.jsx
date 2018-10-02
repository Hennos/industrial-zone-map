import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { keys } from '../../../../store/search/constants';
import { loadObjectDetails } from '../../../../store/objectDetails/actions';

import SearchInput from '../SearchInput';
import SearchFound from '../SearchFound';

const Search = ({ stylization, found, onRequestFoundDetails }) => (
  <div className={classNames('search', stylization)}>
    <SearchInput stylization="search-input-area" />
    {(found.length) ?
      <SearchFound
        stylization="search-found-area"
        onRequestDetails={onRequestFoundDetails}
        found={found}
      /> : null}
  </div>
);

const shapeFound = {};

Search.propTypes = {
  stylization: PropTypes.string,
  found: PropTypes.arrayOf(PropTypes.shape(shapeFound)),
  onRequestFoundDetails: PropTypes.func.isRequired,
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

const mapDispatchToProps = dispatch => ({
  onRequestFoundDetails: id => dispatch(loadObjectDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
