import { events, keys } from './constants';
import { getDefaultLayer } from './helpers';
import initialState from './initialState';

let stream = [];
let iterator = -1;
const handling = 5;

function sliceHandlingStream(str, iter, len) {
  const begin = ((iter - len) < 0) ? 0 : iter - len;
  return str.slice(begin, iter);
}

function handleSetLayer(prevState, { layer: type, data }) {
  const settable = {
    type,
    data,
  };
  stream = sliceHandlingStream(stream, iterator, handling)
    .concat(settable);
  iterator += 1;
  return prevState
    .set(keys.previous, !!stream[iterator - 1])
    .set(keys.current, settable)
    .set(keys.future, !!stream[iterator + 1]);
}

function handleGoPreviousLayer(prevState) {
  const hasPrevious = prevState.get(keys.previous);
  if (!hasPrevious) {
    return prevState;
  }
  iterator -= 1;
  return prevState
    .set(keys.previous, !!stream[iterator - 1])
    .set(keys.current, stream[iterator])
    .set(keys.future, !!stream[iterator + 1]);
}

function handleGoNextLayer(prevState) {
  const hasFuture = prevState.get(keys.future);
  if (!hasFuture) {
    return prevState;
  }
  iterator += 1;
  return prevState
    .set(keys.previous, !!stream[iterator - 1])
    .set(keys.current, stream[iterator])
    .set(keys.future, !!stream[iterator + 1]);
}

const handlers = new Map([
  [events.setLayer, handleSetLayer],
  [events.goPreviousLayer, handleGoPreviousLayer],
  [events.goFutureLayer, handleGoNextLayer],
]);

export default function (state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
