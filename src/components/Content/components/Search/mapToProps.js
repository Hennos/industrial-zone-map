import { createSelector } from 'reselect';

import { keys as searchKeys } from '../../../../store/search/constants';
import { requestDowloadFoundObjects } from '../../../../store/search/actions';
import { userGroupsEnum, keys as statusKeys } from '../../../../store/userStatus/constants';
import { loadObjectDetails } from '../../../../store/objectDetails/actions';
import { requestLoadAreaPropertiesValue } from '../../../../store/areaEditor/actions';
import { showArea } from '../../../../store/mapLayerZone/actions';

const getUserStatus = state => state.userStatus;
const getSuperUser = createSelector(
  getUserStatus,
  status => {
    const userGroups = status.get(statusKeys.groups);
    return userGroups.get(userGroupsEnum.operator) || userGroups.get(userGroupsEnum.admin);
  }
);

const getFoundAreasId = state => state.search[searchKeys.foundAreas];
const getFoundAreasData = state => state.search[searchKeys.foundAreasData];
const getFoundAreas = createSelector(
  getFoundAreasId,
  getFoundAreasData,
  (areas, areasData) =>
    areas.map(id => {
      const area = areasData[id];
      return {
        id,
        data: {
          enabled: area.enabled,
          idZone: area.zone,
          cadastralNumber: area.cadastralNumber,
          usage: area.usage,
          address: area.address
        }
      };
    })
);

export const mapStateToProps = state => ({
  superuser: getSuperUser(state),
  found: getFoundAreas(state)
});

export const mapDispatchToProps = dispatch => ({
  onRequestDowloadFound: () => dispatch(requestDowloadFoundObjects()),
  onRequestFoundDetails: id => dispatch(loadObjectDetails(id)),
  onRequestFoundEdit: id => dispatch(requestLoadAreaPropertiesValue(id)),
  onRequestFoundShow: (zone, area) => dispatch(showArea(zone, area))
});
