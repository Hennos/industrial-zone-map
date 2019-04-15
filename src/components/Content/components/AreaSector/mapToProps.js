import L from 'leaflet';
import { createSelector } from 'reselect';

import { userGroupsEnum, keys as userStatusKeys } from '../../../../store/userStatus/constants';
import { keys as mapLayerZoneKeys } from '../../../../store/mapLayerZone/constants';
import { loadObjectDetails } from '../../../../store/objectDetails/actions';
import { requestLoadAreaPropertiesValue } from '../../../../store/areaEditor/actions';
import { setCreatedArea } from '../../../../store/areaCreation/actions';

const getIsSuperUser = createSelector(
  state => state.userStatus,
  status => {
    const userGroups = status.get(userStatusKeys.groups);
    return userGroups.get(userGroupsEnum.operator) || userGroups.get(userGroupsEnum.admin);
  }
);

const getAreaGeometry = (state, { id }) => {
  const areasGeometry = state.mapLayerZone[mapLayerZoneKeys.areasGeometry];
  return areasGeometry[id];
};
const makeGetSectorCoordinates = () =>
  createSelector(
    getAreaGeometry,
    sector => L.GeoJSON.coordsToLatLngs(sector.coordinates, 1)
  );

const makeGetSectorData = () =>
  createSelector(
    state => state,
    (_, props) => props.id,
    (state, id) => {
      const areasData = state.mapLayerZone[mapLayerZoneKeys.areasData];
      return areasData[id];
    }
  );

const getHighlighted = (state, { id }) => {
  const highlighted = state.mapLayerZone[mapLayerZoneKeys.highlighted];
  return id === highlighted;
};

export const mapStateToProps = () => {
  const getCoordinates = makeGetSectorCoordinates();
  const getData = makeGetSectorData();
  return (state, props) => ({
    editable: getIsSuperUser(state),
    coordinates: getCoordinates(state, props),
    data: getData(state, props),
    highlighted: getHighlighted(state, props)
  });
};

export const mapDispatchToProps = dispatch => ({
  onRequestDetails: id => dispatch(loadObjectDetails(id)),
  onRequestEdit: id => dispatch(requestLoadAreaPropertiesValue(id)),
  onRequestEditCreated: id => dispatch(setCreatedArea(id))
});
