const events = Object.freeze({
  setFiltersData: '@@SEARCH:SET_FILTERS_DATA',
  updateSearchFilterValue: '@@SEARCH:UPDATE_FILTER_VALUE',
  invertFiltersVisability: '@@SEARCH:INVERT_FILTERS_VISABILITY',
  requestSearchObjects: '@@SEARCH:SEARCH_OBJECTS',
  requestDowloadFoundObjects: '@@SEARCH:DOWLOAD_FOUND_OBJECTS',
  getFoundObjects: '@@SEARCH:GET_FOUND_OBJECTS',
  errorGetFoundObjects: '@@SEARCH:ERROR_GET_FOUND_OBJECT'
});

const keys = Object.freeze({
  filters: 'filters',
  filtersData: 'filtersData',
  filtersValue: 'filtersValue',
  filtersVisability: 'filtersVisability',
  foundAreas: 'foundAreas',
  foundAreasData: 'foundAreasData'
});

export { events, keys };
