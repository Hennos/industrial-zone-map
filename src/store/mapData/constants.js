const loadStatusEnum = Object.freeze({
  none: 'NONE',
  loading: 'LOADING',
  success: 'SUCCESS',
});

const events = Object.freeze({
  resetMap: '@@MAP:RESET_MAP',

  chooseIndustrialZone: '@@MAP:CHOOSE_INDUSTRIAL_ZONE',

  loadIndustrialZones: '@@MAP:LOAD_INDUSTRIAL_ZONES',
  successLoadIndustrialZones: '@@MAP:SUCCESS_LOAD_INDUSTRIAL_ZONES',
  errorLoadIndustrialZones: '@@MAP:ERROR_LOAD_INDUSTRIAL_ZONES',

  loadCadastrialAreas: '@@MAP:LOAD:CADASTRIAL_AREAS',
  successLoadCadastrialAreas: '@@MAP:SUCCESS_LOAD_CADASTRIAL_AREAS',
  errorLoadCadastrialAreas: '@@MAP:ERROR_LOAD_CADASTRIAL_AREAS',

  createTerritoryCadastrialArea: '@@MAP:CREATE_TERRITORY_CADASTRIAL_AREA',
  editTerritoryCadastrialAreas: '@@MAP:EDIT_TERRITORY_CADASTRIAL_AREAS',
  removeTerritoryCadastrialArea: '@@MAP:REMOVE_TERRITORY_CADASTRIAL_AREA',
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
