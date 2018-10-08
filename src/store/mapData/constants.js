const loadStatusEnum = Object.freeze({
  none: 'NONE',
  loading: 'LOADING',
  success: 'SUCCESS',
});

const events = Object.freeze({
  chooseIndustrialZone: '@@MAP:CHOOSE_INDUSTRIAL_ZONE',

  loadIndustrialZones: '@@MAP:LOAD_INDUSTRIAL_ZONES',
  successLoadIndustrialZones: '@@MAP:SUCCESS_LOAD_INDUSTRIAL_ZONES',
  errorLoadIndustrialZones: '@@MAP:ERROR_LOAD_INDUSTRIAL_ZONES',

  loadCadastrialAreas: '@@MAP:LOAD:CADASTRIAL_AREAS',
  successLoadCadastrialAreas: '@@MAP:SUCCESS_LOAD_CADASTRIAL_AREAS',
  errorLoadCadastrialAreas: '@@MAP:ERROR_LOAD_CADASTRIAL_AREAS',
});

const keys = Object.freeze({
  activeZone: 'activeZone',
  zones: 'zones',
  zonesData: 'zonesData',
  zonesGeoData: 'zonesGeoData',
  zonesLoadStatus: 'zonesLoadStatus',
  zonesLoadErrorMessage: 'zonesLoadErrorMessage',
  areas: 'areas',
  areasData: 'areasData',
  areasGeoData: 'areasGeoData',
  areasLoadStatus: 'areasLoadStatus',
  areasLoadErrorMessage: 'areasLoadErrorMessage',
});

export { loadStatusEnum, events, keys };
