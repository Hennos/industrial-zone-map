import { events } from './constants';

export const setFiltersData = filters => ({
  type: events.setFiltersData,
  filters
});

export const updateSearchFilterValue = (name, value) => ({
  type: events.updateSearchFilterValue,
  name,
  value
});

export const invertFiltersVisability = () => ({
  type: events.invertFiltersVisability
});

export const requestSearchObjects = search => ({
  type: events.requestSearchObjects,
  search
});

export const requestDowloadFoundObjects = () => ({
  type: events.requestDowloadFoundObjects
});

export const getFoundObjects = found => ({
  type: events.getFoundObjects,
  found
});

export const errorGetFoundObjects = error => ({
  type: events.errorGetFoundObjects,
  error
});
