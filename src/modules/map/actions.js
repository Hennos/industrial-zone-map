import { events } from './constants';

export const requestToken = () => ({
  type: events.requestToken,
});

export const setToken = token => ({
  type: events.setToken,
  token,
});
