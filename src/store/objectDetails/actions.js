import { events } from './constants';

const loadObjectDetails =
  id => ({
    type: events.loadObjectDetails,
    id,
  });

const getLoadedObjectDetails =
  object => ({
    type: events.getLoadedObjectDetails,
    object,
  });

const closeObjectDetails =
  () => ({
    type: events.closeObjectDetails,
  });

const errorLoadObjectDetails =
  error => ({
    type: events.errorLoadObjectDetails,
    error,
  });

export {
  loadObjectDetails,
  getLoadedObjectDetails,
  closeObjectDetails,
  errorLoadObjectDetails,
};
