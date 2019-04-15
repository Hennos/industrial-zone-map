import { events, keys } from './constants';
import initialState from './initialState';

function handleSetAreaPropertiesData(prevState, { properties }) {
  const validProps = properties.filter(({ type }) => type !== 'range');
  const propsNames = validProps.map(({ name }) => name);
  const propsData = Object.fromEntries(validProps.map(({ name, type, ...other }) => [name, other]));
  const updatedStateChunk = Object.fromEntries([
    [keys.properties, propsNames],
    [keys.propsData, propsData]
  ]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleSuccessLoadObjectDetails(prevState, { object }) {
  const { id, properties } = object;
  const prevPropsValue = prevState[keys.propsValue];
  const updatedPropsValue = {
    ...prevPropsValue,
    ...properties
  };
  const updatedStateChunk = Object.fromEntries([
    [keys.id, id],
    [keys.propsValue, updatedPropsValue],
    [keys.ready, true]
  ]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleSuccesLoadAreaPhotos(prevState, { objects }) {
  const photosList = objects.map(object => object.properties.photo.SRC);
  const prevPropsValue = prevState[keys.propsValue];
  const updatedPropsValue = {
    ...prevPropsValue,
    photos: photosList
  };
  const updatedStateChunk = Object.fromEntries([[keys.propsValue, updatedPropsValue]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleUnsetObjectDetails(prevState) {
  const updatedStateChunk = Object.fromEntries([[keys.propsValue, {}], [keys.ready, false]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
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
