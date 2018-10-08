import Immutable from 'immutable';

import { events, keys } from './constants';
import initialState from './initialState';

function handleUpdateSearchFilterValue(prevState, action) {
  const { id, value } = action;

  const updatedFiltersValue = prevState
    .get(keys.filtersValue)
    .set(id, value);

  return prevState.set(keys.filtersValue, updatedFiltersValue);
}

function handleInvertFiltersVisability(prevState) {
  const prevVisability = prevState.get(keys.filtersVisability);
  return prevState
    .set(keys.filtersVisability, !prevVisability);
}

function handleGetFoundObjects(prevState, { found }) {
  const foundAreasId = Immutable.List(found.map(({ id }) => id));
  const foundAreasData = Immutable.Map(found.map(({ id, properties }) => [id, properties]));
  return prevState
    .set(keys.foundAreas, foundAreasId)
    .set(keys.foundAreasData, foundAreasData);
}

const handlers = new Map([
  [events.updateSearchFilterValue, handleUpdateSearchFilterValue],
  [events.invertFiltersVisability, handleInvertFiltersVisability],
  [events.getFoundObjects, handleGetFoundObjects],
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
