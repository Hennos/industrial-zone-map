import Immutable from 'immutable';

import { loadStatusEnum, events, keys } from './constants';
import initialState from './initialState';

function handleSuccessLoadObjectDetailsData(prevState, { data }) {
  const { properties } = data;
  const propsNames = Immutable.List(properties.map(property => property.name));
  const propsData = Immutable.Map(properties.map(({ name, ...other }) => [name, other]));
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
    .set(keys.loadStatus, loadStatusEnum.success);
}

function handleErrorLoadObjectDetails(prevState) {
  return prevState;
}

function handleUnsetObjectDetails(prevState) {
  return prevState
    .set(keys.propsValue, Immutable.Map())
    .set(keys.loadStatus, loadStatusEnum.none);
}

const handlers = new Map([
  [events.successLoadObjectDetailsData, handleSuccessLoadObjectDetailsData],
  [events.successLoadObjectDetails, handleSuccessLoadObjectDetails],
  [events.errorLoadObjectDetails, handleErrorLoadObjectDetails],
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
