const events = Object.freeze({
  loadObjectDetails: '@@OBJECT_DETAILS:LOAD_OBJECT_DETAILS',
  getLoadedObjectDetails: '@@OBJECT_DETAILS:GET_LOADED_OBJECT_DETAILS',
  closeObjectDetails: '@@OBJECT_DETAILS:CLOSE_OBJECT_DETAILS',
  errorLoadObjectDetails: '@@OBJECT_DETAILS:ERROR_LOAD_OBJECT_DETAILS',
});

const keys = Object.freeze({
  id: 'id',
  loadStatus: 'loadStatus',
  loadErrorMessage: 'loadErrorMessage',
  district: 'district',
  address: 'address',
  cadastralNumber: 'cadastralNumber',
  area: 'area',
  usage: 'usage',
  hazardClass: 'usage',
  protectionZone: 'protectionZone',
  activity: 'activity',
  reorganization: 'reorganization',
  rightHolder: 'rightHodler',
  rightFoundation: 'rightFoundation',
  gasSupply: 'gasSupply',
  waterSupply: 'waterSupply',
  waterDrainage: 'waterDrainage',
  heatSupply: 'heatSupply',
  powerSupply: 'powerSupply',
});

export { events, keys };
