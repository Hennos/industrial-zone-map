import { events } from './constants';
import initialState from './initialState';

function handleGetLoadedObjectDetails(state) {
  return state;
}

function handleErrorLoadObjectDetails(state) {
  return state;
}

const handlers = new Map([
  [events.getLoadedObjectDetails, handleGetLoadedObjectDetails],
  [events.errorLoadObjectDetails, handleErrorLoadObjectDetails],
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
