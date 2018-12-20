import Immutable from 'immutable';

import { keys } from './constants';

const initialState = Immutable.Map([
  [keys.previous, false],
  [keys.current, null],
  [keys.future, false]
]);

export default initialState;
