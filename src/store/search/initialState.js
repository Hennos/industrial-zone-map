import Immutable from 'immutable';

import { keys } from './constants';

const initialState = Immutable.Map([
  [keys.filters, Immutable.List()],
  [keys.filtersData, Immutable.Map()],
  [keys.filtersValue, Immutable.Map()],
  [keys.filtersVisability, false],
  [keys.foundAreas, Immutable.List()],
  [keys.foundAreasData, Immutable.Map()]
]);

export default initialState;
