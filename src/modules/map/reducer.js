import { events, keys } from './constants';
import initialState from './state';

const setTokenHandler = (state, { token }) => state.set(keys.token, token);

const handlers = new Map([
  [events.setToken, setTokenHandler],
]);

const reducer = (state = initialState, action) =>
  (handlers.has(action.type) ? handlers.get(action.type)(state, action) : state);

export default reducer;
