import Immutable from 'immutable';

import { loadStatusEnum, keys } from './constants';

const initialState = Immutable.Map([
  [keys.id, null],
  [keys.loadErrorMessage, ''],
  [keys.properties, Immutable.List()],
  [keys.propsData, Immutable.Map()],
  [keys.propsValue, Immutable.Map()],
  [keys.loadPropsDataStatus, loadStatusEnum.none],
  [keys.loadPropsValueStatus, loadStatusEnum.none],
  [keys.editorVisability, false],
]);

export default initialState;
