import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchInput from '../SearchInput';
import SearchDowloadFound from '../SearchDowloadFound';
import SearchFound from '../SearchFound';

import { mapStateToProps, mapDispatchToProps } from './mapToProps';

import './index.css';

const Search = ({
  stylization,
  superuser,
  found,
  onRequestDowloadFound,
  onRequestFoundDetails,
  onRequestFoundEdit,
  onRequestFoundShow
}) => (
  <div className={classNames('search', stylization)}>
    <SearchInput stylization="search-input-area" />
    {found.length ? (
      <div className="search-controls">
        <SearchDowloadFound
          stylization="search-control"
          found={found.map(({ id }) => id)}
          onRequestDowloadFound={onRequestDowloadFound}
        />
      </div>
    ) : null}
    {found.length ? (
      <SearchFound
        stylization="search-found-area"
        editable={superuser}
        onRequestDetails={onRequestFoundDetails}
        onRequestEdit={onRequestFoundEdit}
        onRequestShow={onRequestFoundShow}
        found={found}
      />
    ) : null}
  </div>
);

const shapeFound = {};

Search.propTypes = {
  stylization: PropTypes.string,
  superuser: PropTypes.bool,
  found: PropTypes.arrayOf(PropTypes.shape(shapeFound)),
  onRequestDowloadFound: PropTypes.func.isRequired,
  onRequestFoundDetails: PropTypes.func.isRequired,
  onRequestFoundEdit: PropTypes.func.isRequired,
  onRequestFoundShow: PropTypes.func.isRequired
};

Search.defaultProps = {
  stylization: '',
  superuser: false,
  found: []
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
