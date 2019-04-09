const loadStatusEnum = Object.freeze({
  none: 'NONE',
  loading: 'LOADING',
  success: 'SUCCESS'
});

const events = Object.freeze({
  setCity: '@@MAP_LAYER_CITY:SET_CITY',

  chooseIndustrialZone: '@@MAP_LAYER_CITY:CHOOSE_INDUSTRIAL_ZONE',

  cityLayerSet: '@@MAP_LAYER_CITY:CITY_LAYER_SET',
  clearCityData: '@@MAP_LAYER_CITY:CLEAR_CITY_DATA',

  loadIndustrialZones: '@@MAP_LAYER_CITY:LOAD_INDUSTRIAL_ZONES',
  successLoadIndustrialZones: '@@MAP_LAYER_CITY:SUCCESS_LOAD_INDUSTRIAL_ZONES',
  errorLoadIndustrialZones: '@@MAP_LAYER_CITY:ERROR_LOAD_INDUSTRIAL_ZONES'
});

const keys = Object.freeze({
  zones: 'zones',
  zonesData: 'zonesData',
  zonesGeoData: 'zonesGeoData',
  zonesLoadStatus: 'zonesLoadStatus',
  zonesLoadErrorMessage: 'zonesLoadErrorMessage'
});

export { loadStatusEnum, events, keys };
