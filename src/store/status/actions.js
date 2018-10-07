import { events } from './constants';

const loadUserStatus =
  () => ({
    type: events.loadUserStatus,
  });

const successLoadUserStatus =
  user => ({
    type: events.successLoadUserStatus,
    user,
  });

const errorLoadUserStatus =
  error => ({
    type: events.errorLoadUserStatus,
    error,
  });

export {
  loadUserStatus,
  successLoadUserStatus,
  errorLoadUserStatus,
};
