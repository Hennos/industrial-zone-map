import Immutable from 'immutable';

import { keys } from './constants';

const initialState = Immutable.Map([
  [keys.id, null],
  [keys.ready, false],
  [keys.properties, Immutable.List()],
  [keys.propsData, Immutable.Map()],
  [keys.propsValue, Immutable.Map()],
]);

export default initialState;
