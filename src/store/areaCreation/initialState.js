import Immutable from 'immutable';

import { keys } from './constants';

const initialState = Immutable.Map([
  [keys.id, null],
  [keys.properties, Immutable.List()],
  [keys.propsData, Immutable.Map()],
  [keys.propsValue, Immutable.Map()],
  [keys.areaCreationVisability, false],
]);

export default initialState;
