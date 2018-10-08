import Immutable from 'immutable';

import { loadStatusEnum, keys } from './constants';

const initialState = Immutable.Map([
  [keys.activeZone, NaN],
  [keys.zones, Immutable.List()],
  [keys.zonesData, Immutable.Map()],
  [keys.zonesGeoData, Immutable.Map()],
  [keys.zonesLoadStatus, loadStatusEnum.none],
  [keys.zonesLoadErrorMessage, ''],
  [keys.areas, Immutable.List()],
  [keys.areasData, Immutable.Map()],
  [keys.areasGeoData, Immutable.Map()],
  [keys.areasLoadStatus, loadStatusEnum.none],
  [keys.areasLoadErrorMessage, ''],
]);

export default initialState;
