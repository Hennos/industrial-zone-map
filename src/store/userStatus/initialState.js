import Immutable from 'immutable';

import { loadStatusEnum, keys } from './constants';

const initialState = Immutable.Map([
  [keys.loadStatus, loadStatusEnum.none],
  [keys.loadErrorMessage, ''],
  [keys.authorized, false],
  [keys.groups, Immutable.Map()],
]);

export default initialState;
