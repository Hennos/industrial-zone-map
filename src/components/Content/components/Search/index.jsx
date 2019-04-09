import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { keys as searchKeys } from '../../../../store/search/constants';
import { requestDowloadFoundObjects } from '../../../../store/search/actions';
import { userGroupsEnum, keys as statusKeys } from '../../../../store/userStatus/constants';
import { loadObjectDetails } from '../../../../store/objectDetails/actions';
import { requestLoadAreaPropertiesValue } from '../../../../store/areaEditor/actions';
import { showArea } from '../../../../store/mapLayerZone/actions';

import SearchInput from '../SearchInput';
import SearchDowloadFound from '../SearchDowloadFound';
import SearchFound from '../SearchFound';

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

const mapStateToProps = state => {
  const foundAreas = state.search.get(searchKeys.foundAreas);
  const foundAreasData = state.search.get(searchKeys.foundAreasData);
  const userGroups = state.userStatus.get(statusKeys.groups);
  return {
    superuser: userGroups.get(userGroupsEnum.operator) || userGroups.get(userGroupsEnum.admin),
    found: foundAreas
      .map(id => {
        const areasData = foundAreasData.get(id);
        return {
          id,
          data: {
            territory: areasData.territory,
            idZone: areasData.id_zone,
            cadastrialNumber: areasData.cadastral_number,
            usage: areasData.id_usage,
            address: areasData.address
          }
        };
      })
      .toArray()
  };
};

const mapDispatchToProps = dispatch => ({
  onRequestDowloadFound: () => dispatch(requestDowloadFoundObjects()),
  onRequestFoundDetails: id => dispatch(loadObjectDetails(id)),
  onRequestFoundEdit: id => dispatch(requestLoadAreaPropertiesValue(id)),
  onRequestFoundShow: (zone, area) => dispatch(showArea(zone, area))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
