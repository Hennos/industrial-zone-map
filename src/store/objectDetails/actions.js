import { events } from './constants';

const loadObjectDetailsData =
  () => ({
    type: events.loadObjectDetailsData,
  });

const successLoadObjectDetailsData =
  data => ({
    type: events.successLoadObjectDetailsData,
    data,
  });

const loadObjectDetails =
  id => ({
    type: events.loadObjectDetails,
    id,
  });

const successLoadObjectDetails =
  object => ({
    type: events.successLoadObjectDetails,
    object,
  });

const errorLoadObjectDetails =
  error => ({
    type: events.errorLoadObjectDetails,
    error,
  });

const closeObjectDetails =
  () => ({
    type: events.closeObjectDetails,
  });

const unsetObjectDetails =
  () => ({
    type: events.unsetObjectDetails,
  });

export {
  loadObjectDetailsData,
  successLoadObjectDetailsData,
  loadObjectDetails,
  successLoadObjectDetails,
  errorLoadObjectDetails,
  closeObjectDetails,
  unsetObjectDetails,
};
