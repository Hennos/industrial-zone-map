import Immutable from 'immutable';

import { loadStatusEnum, events, keys } from './constants';
import initialState from './initialState';

function handleSetAreaPropertiesData(prevState, { properties }) {
  const propsName = Immutable.List(properties.map(({ name }) => name));
  const propsData = Immutable.Map(properties.map(({ name, ...other }) => [name, other]));
  return prevState
    .set(keys.properties, propsName)
    .set(keys.propsData, propsData);
}

function handleSetAreaPropertiesValue(prevState, { area }) {
  const { id, properties } = area;
  const usableProps = prevState.get(keys.properties).toArray();
  const propsValue = Immutable.Map(usableProps.map(name => [name, properties[name]]));
  return prevState
    .set(keys.id, id)
    .set(keys.propsValue, propsValue)
    .set(keys.propsValueLoadStatus, loadStatusEnum.success);
}

function handleUnsetAreaPropertiesValue(prevState) {
  return prevState
    .set(keys.id, null)
    .set(keys.propsValue, Immutable.Map())
    .set(keys.propsValueLoadStatus, loadStatusEnum.none);
}

function handleUpdateAreaPropertyValue(prevState, { name, value }) {
  const updatedPropsValue = prevState
    .get(keys.propsValue)
    .set(name, value);
  return prevState.set(keys.propsValue, updatedPropsValue);
}

function handleCloseAreaEditor(prevState) {
  return prevState
    .set(keys.editorVisability, false);
}

function handleOpenAreaEditor(prevState) {
  return prevState
    .set(keys.editorVisability, true);
}

function handleLoadAreaPropertiesValue(prevState) {
  return prevState
    .set(keys.propsValueLoadStatus, loadStatusEnum.loading);
}

function handleErrorLoadAreaPropertiesValue(prevState, { error }) {
  return prevState
    .set(keys.errorMsgLoadAreaPropertiesValue, error)
    .set(keys.propsValueLoadStatus, loadStatusEnum.error);
}

const handlers = new Map([
  [events.setAreaPropertiesData, handleSetAreaPropertiesData],
  [events.setAreaPropertiesValue, handleSetAreaPropertiesValue],
  [events.unsetAreaPropertiesValue, handleUnsetAreaPropertiesValue],
  [events.updateAreaPropertyValue, handleUpdateAreaPropertyValue],
  [events.closeAreaEditor, handleCloseAreaEditor],
  [events.openAreaEditor, handleOpenAreaEditor],
  [events.loadAreaPropertiesValue, handleLoadAreaPropertiesValue],
  [events.errorLoadAreaPropertiesValue, handleErrorLoadAreaPropertiesValue],
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
