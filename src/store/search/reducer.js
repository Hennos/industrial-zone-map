import Immutable from 'immutable';

import { events, keys } from './constants';
import initialState from './initialState';

function handleSetFiltersData(prevState, { filters }) {
  const filtersName = Immutable.List(filters.map(({ name }) => name));
  const filtersData = Immutable.Map(
    filters.map(({ name, type, ...other }) =>
      type === 'range'
        ? [
            name,
            {
              type,
              title: other.property,
              units: other.units,
              default: other.default
            }
          ]
        : [
            name,
            {
              type,
              title: other.property,
              options: other.values,
              default: other.default
            }
          ]
    )
  );
  return prevState.set(keys.filters, filtersName).set(keys.filtersData, filtersData);
}

function handleUpdateSearchFilterValue(prevState, { name, value }) {
  const updatedFiltersValue = prevState.get(keys.filtersValue).set(name, value);
  return prevState.set(keys.filtersValue, updatedFiltersValue);
}

function handleInvertFiltersVisability(prevState) {
  const prevVisability = prevState.get(keys.filtersVisability);
  return prevState.set(keys.filtersVisability, !prevVisability);
}

function handleGetFoundObjects(prevState, { found }) {
  const foundAreasId = Immutable.List(found.map(({ id }) => id));
  const foundAreasData = Immutable.Map(found.map(({ id, properties }) => [id, properties]));
  return prevState.set(keys.foundAreas, foundAreasId).set(keys.foundAreasData, foundAreasData);
}

const handlers = new Map([
  [events.setFiltersData, handleSetFiltersData],
  [events.updateSearchFilterValue, handleUpdateSearchFilterValue],
  [events.invertFiltersVisability, handleInvertFiltersVisability],
  [events.getFoundObjects, handleGetFoundObjects]
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
