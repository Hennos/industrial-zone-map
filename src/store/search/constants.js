const events = Object.freeze({
  loadFiltersData: '@@SEARCH:LOAD_FILTERS_DATA',
  getLoadedFiltersData: '@@SEARCH:GET_LOADED_FILTERS_DATA',
  errorLoadFiltersData: '@@SEARCH:ERROR_LOAD_FILTERS_DATA',
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
