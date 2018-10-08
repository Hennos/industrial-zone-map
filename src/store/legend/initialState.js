import Immutable from 'immutable';

import { keys } from './constants';

const initialState = Immutable.Map([
  [keys.loadStatus, 'LOADING'],
  [keys.loadErrorMessage, ''],
  [keys.legendRecords, Immutable.List()],
  [keys.legendRecordsData, Immutable.Map()],
  [keys.legendVisability, false],
]);

export default initialState;
