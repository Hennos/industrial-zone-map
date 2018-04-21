import events from '../constants/events';

export const ping = () => ({
  type: events.ping,
});

export const pong = () => ({
  type: events.pong,
});
