import Immutable from 'immutable';

import { events, keys } from './constants';
import initialState from './initialState';

function handleSetAreaPropertiesData(prevState, { properties }) {
  const validProps = properties
    .filter(({ type }) => type !== 'range');
  const propsNames = Immutable.List(validProps.map(({ name }) => name));
  const propsData = Immutable.Map(validProps.map(({ name, type, ...other }) => [name, other]));
  return prevState
    .set(keys.properties, propsNames)
    .set(keys.propsData, propsData);
}

function handleSuccessLoadObjectDetails(prevState, { object }) {
  const { id, properties } = object;
  const usableProps = prevState.get(keys.properties).toArray();
  const propsValue = Immutable.Map(usableProps.map(name => [name, properties[name]]));
  return prevState
    .set(keys.id, id)
    .set(keys.propsValue, propsValue)
    .set(keys.ready, true);
}

function handleUnsetObjectDetails(prevState) {
  return prevState
    .set(keys.propsValue, Immutable.Map())
    .set(keys.ready, false);
}

const handlers = new Map([
  [events.setAreaPropertiesData, handleSetAreaPropertiesData],
  [events.successLoadObjectDetails, handleSuccessLoadObjectDetails],
  [events.unsetObjectDetails, handleUnsetObjectDetails],
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
