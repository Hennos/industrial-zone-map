import Immutable from 'immutable';

import { keys } from './constants';

const initialState = Immutable.Map([
  [keys.block, 'SEARCH'],
]);

export default initialState;
