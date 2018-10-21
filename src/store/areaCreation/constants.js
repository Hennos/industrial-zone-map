const events = Object.freeze({
  publishCreatedCadastrialArea: '@@AREA_CREATION:PUBLISH_CREATED_CADASTRIAL_AREA',
  saveCreatedCadastrialArea: '@@AREA_CREATION:SAVE_CREATED_CADASTRIAL_AREA',
  removeCreatedCadastrialArea: '@@AREA_CREATION:REMOVE_CREATED_CADASTRIAL_AREA',

  closeAreaCreation: '@@AREA_CREATION:CLOSE_AREA_CREATION',
  openAreaCreation: '@@AREA_CREATION:OPEN_AREA_CREATION',

  updateAreaPropertyValue: '@@AREA_CREATION:UPDATE_AREA_PROPERTY_VALUE',

  setAreaPropertiesData: '@@AREA_CREATION:SET_AREA_PROPERTIES_DATA',

  setCreatedArea: '@@AREA_CREATION:SET_CREATED_AREA',
  unsetCreatedArea: '@@AREA_CREATION:UNSET_CREATED_AREA',

  requestPublishCreatedCadastrialArea: '@@AREA_CREATION:REQUEST_PUBLISH_CREATED_CADASTRIAL_AREA',
  successPublishCreatedCadastrialArea: '@@AREA_CREATION:SUCCESS_PUBLISH_CREATED_CADASTRIAL_AREA',
  errorPublishCreatedCadastrialArea: '@@AREA_CREATION:ERROR_PUBLISH_CREATED_CADASTRIAL_AREA',
});

const keys = Object.freeze({
  id: 'id',
  properties: 'propertries',
  propsData: 'propsData',
  propsValue: 'propsValue',
  areaCreationVisability: 'areaCreationVisability',
});

export { events, keys };
