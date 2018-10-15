import { events } from './constants';

const loadPropertiesData =
  () => ({
    type: events.loadPropertiesData,
  });

const successLoadPropertiesData =
  props => ({
    type: events.successLoadPropertiesData,
    props,
  });

const updateAreaPropertiesValue =
  (name, value) => ({
    type: events.updateAreaPropertiesValue,
    name,
    value,
  });

const errorLoadProperties =
  error => ({
    type: events.errorLoadProperties,
    error,
  });

const closeAreaEditor =
  () => ({
    type: events.closeAreaEditor,
  });

const openAreaEditor =
  () => ({
    type: events.openAreaEditor,
  });

const startAreaEditing =
  area => ({
    type: events.startAreaEditing,
    area,
  });

const stopAreaEditing =
  () => ({
    type: events.stopAreaEditing,
  });

const removeCadastrialArea =
  area => ({
    type: events.removeCadastrialArea,
    area,
  });

export {
  loadPropertiesData,
  successLoadPropertiesData,
  updateAreaPropertiesValue,
  errorLoadProperties,
  closeAreaEditor,
  openAreaEditor,
  startAreaEditing,
  stopAreaEditing,
  removeCadastrialArea,
};
