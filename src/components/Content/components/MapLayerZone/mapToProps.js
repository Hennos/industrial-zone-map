import { createSelector } from 'reselect';

import { userGroupsEnum, keys as userStatusKeys } from '../../../../store/userStatus/constants';
import { loadStatusEnum, keys as mapLayerZoneKeys } from '../../../../store/mapLayerZone/constants';
import {
  createTerritoryCadastrialArea,
  editTerritoryCadastrialAreas
} from '../../../../store/mapLayerZone/actions';
import { loadObjectDetails } from '../../../../store/objectDetails/actions';
import { requestLoadAreaPropertiesValue } from '../../../../store/areaEditor/actions';
import { setCreatedArea } from '../../../../store/areaCreation/actions';

const getIsSuccessLoaded = createSelector(
  state => state.mapLayerZone[mapLayerZoneKeys.areasLoadStatus],
  status => status === loadStatusEnum.success
);

const getIsSuperUser = createSelector(
  state => state.userStatus,
  status => {
    const userGroups = status.get(userStatusKeys.groups);
    return userGroups.get(userGroupsEnum.operator) || userGroups.get(userGroupsEnum.admin);
  }
);

const getActiveZone = createSelector(
  state => state.mapLayerZone[mapLayerZoneKeys.zone],
  zone =>
    zone && {
      id: zone.id,
      geometry: zone.geometry
    }
);

const getAreasId = state => state.mapLayerZone[mapLayerZoneKeys.areas];
const getAreasGeometry = state => state.mapLayerZone[mapLayerZoneKeys.areasGeometry];
const getAreas = createSelector(
  getAreasId,
  getAreasGeometry,
  (areas, geometries) =>
    areas.reduce(
      ([sectors, objects], id) => {
        const geometry = geometries[id];
        switch (geometry.type) {
          case 'Polygon':
            return [sectors.concat(id), objects];
          case 'Point':
            return [sectors, objects.concat(id)];
          default:
            return [sectors, objects];
        }
      },
      [[], []]
    )
);
const getSectors = createSelector(
  getAreas,
  ([sectors]) => sectors
);
const getObjects = createSelector(
  getAreas,
  ([, objects]) => objects
);

export const mapStateToProps = state => ({
  loaded: getIsSuccessLoaded(state),
  superuser: getIsSuperUser(state),
  zone: getActiveZone(state),
  sectors: getSectors(state),
  objects: getObjects(state)
});

export const mapDispatchToProps = dispatch => ({
  onRequestAreaDetails: id => dispatch(loadObjectDetails(id)),
  onRequestAreaEdit: id => dispatch(requestLoadAreaPropertiesValue(id)),
  onRequestCreatedAreaEdit: id => dispatch(setCreatedArea(id)),
  onCreateCadastrialArea: area => dispatch(createTerritoryCadastrialArea(area)),
  onEditCadastrialAreas: areas => dispatch(editTerritoryCadastrialAreas(areas))
});
