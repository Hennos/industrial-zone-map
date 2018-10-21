const propsEnum = Object.freeze({
  address: 'address',
  cadastralNumber: 'cadastral_number',
  usage: 'id_usage',
  hazardClass: 'id_hazardclass',
  rightHolder: 'rightholder',
  rightFoundation: 'right_foundation',
  activity: 'id_activity',
  protectionZone: 'protection_zone',
  connectivityOptions: 'connectivity',
  reorganization: 'reorganization',
});

const events = Object.freeze({
  setAreaPropertiesData: '@@OBJECT_DETAILS:SET_AREA_PROPERTIES_DATA',

  loadObjectDetails: '@@OBJECT_DETAILS:LOAD_OBJECT_DETAILS',
  successLoadObjectDetails: '@@OBJECT_DETAILS:SUCCESS_LOAD_OBJECT_DETAILS',
  errorLoadObjectDetails: '@@OBJECT_DETAILS:ERROR_LOAD_OBJECT_DETAILS',

  closeObjectDetails: '@@OBJECT_DETAILS:CLOSE_OBJECT_DETAILS',
  unsetObjectDetails: '@@OBJECT_DETAILS:UNSET_OBJECT_DETAILS',
});

const keys = Object.freeze({
  id: 'id',
  ready: 'ready',
  properties: 'propertries',
  propsData: 'propsData',
  propsValue: 'propsValue',
});

export { propsEnum, events, keys };
