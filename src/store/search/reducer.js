import { events, keys } from './constants';
import initialState from './initialState';

function handleUpdateSearchFilterValue(state, action) {
  const { id, value } = action;

  const updatedFiltersValue = state
    .get(keys.filtersValue)
    .set(id, value);

  return state.set(keys.filtersValue, updatedFiltersValue);
}

const handlers = new Map([
  [events.updateSearchFilterValue, handleUpdateSearchFilterValue],
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
