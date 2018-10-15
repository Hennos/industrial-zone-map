import Immutable from 'immutable';

import { loadStatusEnum, events, keys } from './constants';
import initialState from './initialState';

function handleLoadPropertiesData(prevState) {
  return prevState
    .set(keys.loadPropsDataStatus, loadStatusEnum.loading);
}

function handleSuccessLoadPropertiesData(prevState, { props }) {
  const properties = Immutable.List(props.map(property => property.name));
  const propsData = Immutable.Map(props.map(({ name, ...other }) => [name, other]));
  return prevState
    .set(keys.properties, properties)
    .set(keys.propsData, propsData)
    .set(keys.loadPropsDataStatus, loadStatusEnum.success);
}

function handleLoadAreaPropertiesValue(prevState) {
  return prevState
    .set(keys.loadPropsValueStatus, loadStatusEnum.loading);
}

function handleSuccessLoadAreaPropertiesValue(prevState) {
  return prevState
    .set(keys.loadPropsValueStatus, loadStatusEnum.success);
}

function handleStartAreaEditing(prevState, { area }) {
  const { id, properties } = area;
  const usableProps = prevState.get(keys.properties).toArray();
  const propsValue = Immutable.Map(usableProps.map(name => [name, properties[name]]));
  return prevState
    .set(keys.id, id)
    .set(keys.propsValue, propsValue);
}

function handleEditCadastrialArea(prevState, { area }) {
  const { id, properties } = area;
  const usableProps = prevState.get(keys.properties).toArray();
  const propsValue = Immutable.Map(usableProps.map(name => [name, properties[name]]));
  return prevState
    .set(keys.id, id)
    .set(keys.propsValue, propsValue);
}

function handleErrorLoadObjectDetails(prevState, { error }) {
  return prevState
    .set(keys.loadErrorMessage, error.toString());
}

function handleUpdateAreaPropertiesValue(prevState, { name, value }) {
  const updatedPropsValue = prevState
    .get(keys.propsValue)
    .set(name, value);
  return prevState.set(keys.filtersValue, updatedPropsValue);
}

function handleCloseAreaEditor(prevState) {
  return prevState
    .set(keys.editorVisability, false);
}

function handleOpenAreaEditor(prevState) {
  return prevState
    .set(keys.editorVisability, true);
}

function handleStopAreaEditing(prevState) {
  return prevState
    .set(keys.id, null)
    .set(keys.propsValue, Immutable.Map())
    .set(keys.loadPropsValueStatus, loadStatusEnum.none);
}

const handlers = new Map([
  [events.loadPropertiesData, handleLoadPropertiesData],
  [events.successLoadPropertiesData, handleSuccessLoadPropertiesData],
  [events.loadAreaPropertiesValue, handleLoadAreaPropertiesValue],
  [events.successLoadAreaPropertiesValue, handleSuccessLoadAreaPropertiesValue],
  [events.updateAreaPropertiesValue, handleUpdateAreaPropertiesValue],
  [events.errorLoadProperties, handleErrorLoadObjectDetails],
  [events.closeAreaEditor, handleCloseAreaEditor],
  [events.openAreaEditor, handleOpenAreaEditor],
  [events.startAreaEditing, handleStartAreaEditing],
  [events.stopAreaEditing, handleStopAreaEditing],
  [events.editCadastrialArea, handleEditCadastrialArea],
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
