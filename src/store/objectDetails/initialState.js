import Immutable from 'immutable';

import { keys } from './constants';

const initialState = Immutable.Map([
  [keys.loadStatus, 'LOADING'],
  [keys.loadErrorMessage, ''],
  [keys.id, null],
  [keys.district, ''],
  [keys.address, ''],
  [keys.cadastralNumber, ''],
  [keys.usage, []],
  [keys.hazardClass, NaN],
  [keys.protectionZone, NaN],
  [keys.activity, []],
  [keys.rightHolder, ''],
  [keys.rightFoundation, ''],
  [keys.gasSupply, NaN],
  [keys.waterSupply, NaN],
  [keys.waterDrainage, NaN],
  [keys.heatSupply, ''],
  [keys.powerSupply, ''],
  [keys.reorganization, ''],
  [keys.area, NaN],
]);

export default initialState;
