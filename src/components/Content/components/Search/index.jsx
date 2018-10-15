import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { keys as searchKeys } from '../../../../store/search/constants';
import { userGroupsEnum, keys as statusKeys } from '../../../../store/userStatus/constants';
import { loadObjectDetails } from '../../../../store/objectDetails/actions';
import { loadAreaPropertiesValue } from '../../../../store/areaEditor/actions';

import SearchInput from '../SearchInput';
import SearchFound from '../SearchFound';

const Search = ({
  stylization,
  superuser,
  found,
  onRequestFoundDetails,
  onRequestFoundEdit,
}) => (
  <div className={classNames('search', stylization)}>
    <SearchInput stylization="search-input-area" />
    {(found.length) ?
      <SearchFound
        stylization="search-found-area"
        editable={superuser}
        onRequestDetails={onRequestFoundDetails}
        onRequestEdit={onRequestFoundEdit}
        found={found}
      /> : null}
  </div>
);

const shapeFound = {};

Search.propTypes = {
  stylization: PropTypes.string,
  superuser: PropTypes.bool,
  found: PropTypes.arrayOf(PropTypes.shape(shapeFound)),
  onRequestFoundDetails: PropTypes.func.isRequired,
  onRequestFoundEdit: PropTypes.func.isRequired,
};

Search.defaultProps = {
  stylization: '',
  superuser: false,
  found: [],
};

const mapStateToProps = (state) => {
  const foundAreas = state.search.get(searchKeys.foundAreas);
  const foundAreasData = state.search.get(searchKeys.foundAreasData);
  const userGroups = state.userStatus.get(statusKeys.groups);
  return {
    superuser: userGroups.get(userGroupsEnum.operator) || userGroups.get(userGroupsEnum.admin),
    found: foundAreas.map(id => ({
      id,
      data: foundAreasData.get(id),
    })).toArray(),
  };
};

const mapDispatchToProps = dispatch => ({
  onRequestFoundDetails: id => dispatch(loadObjectDetails(id)),
  onRequestFoundEdit: id => dispatch(loadAreaPropertiesValue(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
