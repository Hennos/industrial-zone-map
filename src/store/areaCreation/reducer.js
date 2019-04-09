import Immutable from 'immutable';

import { events, keys } from './constants';
import initialState from './initialState';

function handleCloseAreaCreation(prevState) {
  return prevState.set(keys.areaCreationVisability, false);
}

function handleOpenAreaCreation(prevState) {
  return prevState.set(keys.areaCreationVisability, true);
}

function handleUpdateAreaPropertyValue(prevState, { name, value }) {
  const updatedPropsValue = prevState.get(keys.propsValue).set(name, value);
  return prevState.set(keys.propsValue, updatedPropsValue);
}

function handleSetAreaPropertiesData(prevState, { properties }) {
  const propsName = Immutable.List(properties.map(({ name }) => name));
  const propsData = Immutable.Map(properties.map(({ name, ...other }) => [name, other]));
  return prevState.set(keys.properties, propsName).set(keys.propsData, propsData);
}

function handleSetCreatedArea(prevState, { area }) {
  return prevState.set(keys.id, area);
}

function handleUnsetCreatedArea(prevState) {
  return prevState.set(keys.id, null).set(keys.propsValue, Immutable.Map());
}

const handlers = new Map([
  [events.closeAreaCreation, handleCloseAreaCreation],
  [events.openAreaCreation, handleOpenAreaCreation],
  [events.updateAreaPropertyValue, handleUpdateAreaPropertyValue],
  [events.setAreaPropertiesData, handleSetAreaPropertiesData],
  [events.setCreatedArea, handleSetCreatedArea],
  [events.unsetCreatedArea, handleUnsetCreatedArea]
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
