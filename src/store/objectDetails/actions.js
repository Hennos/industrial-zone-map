import { events } from './constants';

const setAreaPropertiesData =
  properties => ({
    type: events.setAreaPropertiesData,
    properties,
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
  setAreaPropertiesData,
  loadObjectDetails,
  successLoadObjectDetails,
  errorLoadObjectDetails,
  closeObjectDetails,
  unsetObjectDetails,
};
