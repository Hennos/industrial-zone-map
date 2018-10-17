import { events } from './constants';

const setFiltersData =
  filters => ({
    type: events.setFiltersData,
    filters,
  });

const updateSearchFilterValue =
  (name, value) => ({
    type: events.updateSearchFilterValue,
    name,
    value,
  });

const invertFiltersVisability =
  () => ({
    type: events.invertFiltersVisability,
  });

const requestSearchObjects =
  search => ({
    type: events.requestSearchObjects,
    search,
  });

const getFoundObjects =
  found => ({
    type: events.getFoundObjects,
    found,
  });

const errorGetFoundObjects =
  error => ({
    type: events.errorGetFoundObjects,
    error,
  });

export {
  setFiltersData,
  updateSearchFilterValue,
  invertFiltersVisability,
  requestSearchObjects,
  getFoundObjects,
  errorGetFoundObjects,
};
