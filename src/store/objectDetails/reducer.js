import Immutable from 'immutable';

import { events, keys } from './constants';
import initialState from './initialState';

function handleSetAreaPropertiesData(prevState, { properties }) {
  const validProps = properties.filter(({ type }) => type !== 'range');
  const propsNames = Immutable.List(validProps.map(({ name }) => name));
  const propsData = Immutable.Map(validProps.map(({ name, type, ...other }) => [name, other]));
  return prevState.set(keys.properties, propsNames).set(keys.propsData, propsData);
}

function handleSuccessLoadObjectDetails(prevState, { object }) {
  const { id, properties } = object;
  const prevPropsValue = prevState.get(keys.propsValue);
  const addedPropsValue = Immutable.Map(Object.entries(properties));
  return prevState
    .set(keys.id, id)
    .set(keys.propsValue, prevPropsValue.merge(addedPropsValue))
    .set(keys.ready, true);
}

function handleSuccesLoadAreaPhotos(prevState, { objects }) {
  const photosList = objects.map(object => object.properties.photo.SRC);
  const prevPropsValue = prevState.get(keys.propsValue);
  return prevState.set(keys.propsValue, prevPropsValue.set('photos', photosList));
}

function handleUnsetObjectDetails(prevState) {
  return prevState.set(keys.propsValue, Immutable.Map()).set(keys.ready, false);
}

const handlers = new Map([
  [events.setAreaPropertiesData, handleSetAreaPropertiesData],
  [events.successLoadObjectDetails, handleSuccessLoadObjectDetails],
  [events.successLoadAreaPhotos, handleSuccesLoadAreaPhotos],
  [events.unsetObjectDetails, handleUnsetObjectDetails]
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
