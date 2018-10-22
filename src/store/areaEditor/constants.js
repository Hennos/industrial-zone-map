const loadStatusEnum = Object.freeze({
  none: 'NONE',
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR',
});

const events = Object.freeze({
  publishChangesCadastrialArea: '@@AREA_EDITOR:PUBLISH_CHANGES_CADASTRIAL_AREA',
  saveChangesCadastrialArea: '@@AREA_EDITOR:SAVE_CHANGES_CADASTRIAL_AREA',
  removeCadastrialArea: '@@AREA_EDITOR:REMOVE_CADASTRIAL_AREA',

  closeAreaEditor: '@@AREA_EDITOR:CLOSE_AREA_EDITOR',
  openAreaEditor: '@@AREA_EDITOR:OPEN_AREA_EDITOR',

  updateAreaPropertyValue: '@@AREA_EDITOR:UPDATE_AREA_PROPERTY_VALUE',

  setAreaPropertiesData: '@@AREA_EDITOR:SET_AREA_PROPERTIES_DATA',

  setAreaPropertiesValue: '@@AREA_EDITOR:SET_AREA_PROPERTIES_VALUE',
  unsetAreaPropertiesValue: '@@AREA_EDITOR:UNSET_AREA_PROPERTIES_VALUE',

  requestLoadAreaPropertiesValue: '@@AREA_EDITOR:REQUEST_LOAD_AREA_PROPERTIES_VALUE',
  loadAreaPropertiesValue: '@@AREA_EDITOR:LOAD_AREA_PROPERTIES_VALUE',
  successLoadAreaPropertiesValue: '@@AREA_EDITOR:SUCCESS_LOAD_PROPERTIES_VALUE',
  errorLoadAreaPropertiesValue: '@@AREA_EDITOR:ERROR_LOAD_PROPERTIES_VALUE',

  requestPublishCadastrialArea: '@@AREA_EDITOR:REQUEST_PUBLISH_CADASTRIAL_AREA',
  successPublishCadastrialArea: '@@AREA_EDITOR:SUCCESS_PUBLISH_CADASTRIAL_AREA',
  errorPublishCadastrialArea: '@@AREA_EDITOR:ERROR_PUBLISH_CADASTRIAL_AREA',

  requestRemoveCadastrialArea: '@@AREA_EDITOR:REQUEST_REMOVE_CADASTRIAL_AREA',
  successRemoveCadastrialArea: '@@AREA_EDITOR:SUCCESS_REMOVE_CADASTRIAL_AREA',
  errorRemoveCadastrialArea: '@@AREA_EDITOR:ERROR_REMOVE_CADASTRIAL_AREA',
});

const keys = Object.freeze({
  id: 'id',
  properties: 'propertries',
  propsData: 'propsData',
  propsValue: 'propsValue',
  propsValueLoadStatus: 'propsValueLoadStatus',
  errorMsgLoadAreaPropertiesValue: 'errorMsgLoadAreaPropertiesValue',
  editorVisability: 'editorVisability',
});

export { loadStatusEnum, events, keys };
