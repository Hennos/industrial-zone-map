const events = Object.freeze({
  loadFiltersData: '@@SEARCH:LOAD_FILTERS_DATA',
  updateSearchFilterValue: '@@SEARCH:UPDATE_FILTER_VALUE',
});

const keys = Object.freeze({
  filters: 'filters',
  filtersData: 'filtersData',
  filtersValue: 'filtersValue',
  foundAreas: 'foundAreas',
  foundAreasData: 'foundAreasData',
});

export { events, keys };
