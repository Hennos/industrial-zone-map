import { events } from './constants';

const setUserStatus =
  user => ({
    type: events.setUserStatus,
    user,
  });

export { setUserStatus };
