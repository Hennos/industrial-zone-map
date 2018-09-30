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

export {
  loadFiltersData,
  getLoadedFiltersData,
  errorLoadFiltersData,
  updateSearchFilterValue,
};
