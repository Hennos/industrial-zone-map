import { events, keys } from './constants';
import initialState from './initialState';

function handleAccessToInformationBlock(state, { block }) {
  return state.set(keys.block, block);
}

const handlers = new Map([
  [events.accessToInformationBlock, handleAccessToInformationBlock],
]);

const reducer = (state = initialState, action) => {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
};

export default reducer;
