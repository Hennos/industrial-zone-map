const loadStatusEnum = Object.freeze({
  none: 'NONE',
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR',
});

const propsEnum = Object.freeze({
  address: 'address',
  cadastralNumber: 'cadastralNumber',
  usage: 'usage',
  hazardClass: 'hazardClass',
  rightHolder: 'rightHolder',
  rightFoundation: 'rightFoundation',
  activity: 'activity',
  protectionZone: 'protectionZone',
  connectivityOptions: 'connectivityOptions',
  reorganization: 'reorganization',
});

const events = Object.freeze({
  loadObjectDetailsData: '@@OBJECT_DETAILS:LOAD_OBJECT_DETAILS_DATA',
  successLoadObjectDetailsData: '@@OBJECT_DETAILS:SUCCESS_LOAD_OBJECT_DETAILS_DATA',

  loadObjectDetails: '@@OBJECT_DETAILS:LOAD_OBJECT_DETAILS',
  successLoadObjectDetails: '@@OBJECT_DETAILS:SUCCESS_LOAD_OBJECT_DETAILS',

  errorLoadObjectDetails: '@@OBJECT_DETAILS:ERROR_LOAD_OBJECT_DETAILS',

  closeObjectDetails: '@@OBJECT_DETAILS:CLOSE_OBJECT_DETAILS',
  unsetObjectDetails: '@@OBJECT_DETAILS:UNSET_OBJECT_DETAILS',
});

const keys = Object.freeze({
  id: 'id',
  loadStatus: 'loadStatus',
  loadErrorMessage: 'loadErrorMessage',
  properties: 'propertries',
  propsData: 'propsData',
  propsValue: 'propsValue',
});

export { loadStatusEnum, propsEnum, events, keys };
