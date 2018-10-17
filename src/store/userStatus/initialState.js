import Immutable from 'immutable';

import { keys } from './constants';

const initialState = Immutable.Map([
  [keys.authorized, false],
  [keys.groups, Immutable.Map()],
]);

export default initialState;
