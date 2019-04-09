import Immutable from 'immutable';

import { loadStatusEnum, keys } from './constants';

const createInitialState = () =>
  Immutable.Map([
    [keys.zone, null],
    [keys.highlighted, null],
    [keys.areas, Immutable.List()],
    [keys.areasData, Immutable.Map()],
    [keys.areasGeoData, Immutable.Map()],
    [keys.areasLoadStatus, loadStatusEnum.none],
    [keys.areasLoadErrorMessage, '']
  ]);

export default createInitialState;
