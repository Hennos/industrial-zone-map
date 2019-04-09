const loadStatusEnum = Object.freeze({
  none: 'NONE',
  loading: 'LOADING',
  success: 'SUCCESS'
});

const events = Object.freeze({
  showArea: '@@MAP_LAYER_ZONE:SHOW_AREA',
  highlightArea: '@@MAP_LAYER_ZONE:HIGHLIGHT_AREA',

  setZone: '@@MAP_LAYER_ZONE:SET_ZONE',

  zoneLayerSet: '@@MAP_LAYER_ZONE:ZONE_LAYER_SET',
  clearZoneData: '@@MAP_LAYER_ZONE:CLEAR_ZONE_DATA',

  loadIndustrialZone: '@@MAP_LAYER_ZONE:LOAD_INDUSTRIAL_ZONE',
  successLoadIndustrialZone: '@@MAP_LAYER_ZONE:SUCCESS_LOAD_INDUSTRIAL_ZONE',
  errorLoadIndustrialZone: '@@MAP_LAYER_ZONE:ERROR_LOAD_INDUSTRIAL_ZONE',

  loadCadastrialAreas: '@@MAP_LAYER_ZONE:LOAD_CADASTRIAL_AREAS',
  successLoadCadastrialAreas: '@@MAP_LAYER_ZONE:SUCCESS_LOAD_CADASTRIAL_AREAS',
  errorLoadCadastrialAreas: '@@MAP_LAYER_ZONE:ERROR_LOAD_CADASTRIAL_AREAS',

  createTerritoryCadastrialArea: '@@MAP_LAYER_ZONE:CREATE_TERRITORY_CADASTRIAL_AREA',
  editTerritoryCadastrialAreas: '@@MAP_LAYER_ZONE:EDIT_TERRITORY_CADASTRIAL_AREAS',
  removeTerritoryCadastrialArea: '@@MAP_LAYER_ZONE:REMOVE_TERRITORY_CADASTRIAL_AREA'
});

const keys = Object.freeze({
  zone: 'zone',
  highlighted: 'highlighted',
  areas: 'areas',
  areasData: 'areasData',
  areasGeoData: 'areasGeoData',
  areasLoadStatus: 'areasLoadStatus',
  areasLoadErrorMessage: 'areasLoadErrorMessage'
});

export { loadStatusEnum, events, keys };
