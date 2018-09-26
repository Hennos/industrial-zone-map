import { events } from './constants';

const updateSearchFilterValue =
  (id, value) => ({
    type: events.updateSearchFilterValue,
    id,
    value,
  });

const loadFiltersData =
  () => ({
    type: events.loadFiltersData,
  });

export {
  updateSearchFilterValue,
  loadFiltersData,
};
