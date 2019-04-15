import { events, keys } from './constants';
import initialState from './initialState';

function handleSetFiltersData(prevState, { filters }) {
  const filtersName = filters.map(({ name }) => name);
  const filtersData = Object.fromEntries(
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
  const updatedStateChunk = Object.fromEntries([
    [keys.filters, filtersName],
    [keys.filtersData, filtersData]
  ]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleUpdateSearchFilterValue(prevState, { name, value }) {
  const prevFiltersValue = prevState[keys.filtersValue];
  const updatedValueChuck = Object.fromEntries([[name, value]]);
  const updatedFiltersValue = {
    ...prevFiltersValue,
    ...updatedValueChuck
  };
  const updatedStateChunk = Object.fromEntries([[keys.filtersValue, updatedFiltersValue]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleInvertFiltersVisability(prevState) {
  const updatedFiltersVisability = !prevState[keys.filtersVisability];
  const updatedStateChunk = Object.fromEntries([
    [keys.filtersVisability, updatedFiltersVisability]
  ]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleGetFoundObjects(prevState, { found }) {
  const foundAreasId = found.map(({ id }) => id);
  const foundAreasData = Object.fromEntries(found.map(({ id, properties }) => [id, properties]));
  const updatedStateChunk = Object.fromEntries([
    [keys.foundAreas, foundAreasId],
    [keys.foundAreasData, foundAreasData]
  ]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
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
