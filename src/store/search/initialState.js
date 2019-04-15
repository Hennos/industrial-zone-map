import { keys } from './constants';

const initialState = Object.fromEntries([
  [keys.filters, []],
  [keys.filtersData, {}],
  [keys.filtersValue, {}],
  [keys.filtersVisability, false],
  [keys.foundAreas, []],
  [keys.foundAreasData, {}]
]);

export default initialState;
