import { events } from './constants';

const loadFiltersData =
  () => ({
    type: events.loadFiltersData,
  });

const getLoadedFiltersData =
  filters => ({
    type: events.getLoadedFiltersData,
    filters,
  });

const errorLoadFiltersData =
  error => ({
    type: events.errorLoadFiltersData,
    error,
  });

const updateSearchFilterValue =
  (id, value) => ({
    type: events.updateSearchFilterValue,
    id,
    value,
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
  loadFiltersData,
  getLoadedFiltersData,
  errorLoadFiltersData,
  updateSearchFilterValue,
  requestSearchObjects,
  getFoundObjects,
  errorGetFoundObjects,
};
