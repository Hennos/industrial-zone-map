const loadStatusEnum = Object.freeze({
  none: 'NONE',
  loading: 'LOADING',
  success: 'SUCCESS',
});

const events = Object.freeze({
  loadPropertiesData: '@@AREA_EDITOR:LOAD_PROPERTIES_DATA',
  successLoadPropertiesData: '@@AREA_EDITOR:SUCCESS_LOAD_PROPERTIES_DATA',

  updateAreaPropertiesValue: '@@AREA_EDITOR:UPDATE_AREA_PROPERTIES_VALUE',

  errorLoadProperties: '@@AREA_EDITOR:ERROR_LOAD_PROPERTIES',

  closeAreaEditor: '@@AREA_EDITOR:CLOSE_AREA_EDITOR',
  openAreaEditor: '@@AREA_EDITOR:OPEN_AREA_EDITOR',

  startAreaEditing: '@@AREA_EDITING:START_AREA_EDITING',
  stopAreaEditing: '@@AREA_EDITOR:STOP_AREA_EDITING',

  removeCadastrialArea: '@@AREA_EDITOR:REMOVE_CADASTRIAL_AREA',
});

const keys = Object.freeze({
  id: 'id',
  loadErrorMessage: 'loadErrorMessage',
  properties: 'propertries',
  propsData: 'propsData',
  propsValue: 'propsValue',
  loadPropsDataStatus: 'loadPropsDataStatus',
  editorVisability: 'editorVisability',
});

export { loadStatusEnum, events, keys };
