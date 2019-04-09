import Immutable from 'immutable';

import { loadStatusEnum, keys } from './constants';

const createInitialState = () =>
  Immutable.Map([
    [keys.zones, Immutable.List()],
    [keys.zonesData, Immutable.Map()],
    [keys.zonesGeoData, Immutable.Map()],
    [keys.zonesLoadStatus, loadStatusEnum.none],
    [keys.zonesLoadErrorMessage, '']
  ]);

export default createInitialState;
