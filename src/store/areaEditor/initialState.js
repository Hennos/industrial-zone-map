import Immutable from 'immutable';

import { loadStatusEnum, keys } from './constants';

const initialState = Immutable.Map([
  [keys.id, null],
  [keys.properties, Immutable.List()],
  [keys.propsData, Immutable.Map()],
  [keys.propsValue, Immutable.Map()],
  [keys.editorVisability, false],
  [keys.loadPropsValueStatus, loadStatusEnum.none],
  [keys.loadErrorMessage, ''],
]);

export default initialState;
