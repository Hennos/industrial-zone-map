import Immutable from 'immutable';

import { loadStatusEnum, keys } from './constants';

const initialState = Immutable.Map([
  [keys.id, null],
  [keys.loadStatus, loadStatusEnum.none],
  [keys.loadErrorMessage, ''],
  [keys.properties, Immutable.List()],
  [keys.propsData, Immutable.Map()],
  [keys.propsValue, Immutable.Map()],
]);

export default initialState;
