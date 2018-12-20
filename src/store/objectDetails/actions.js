import { events } from './constants';

export const setAreaPropertiesData = properties => ({
  type: events.setAreaPropertiesData,
  properties
});

export const loadObjectDetails = area => ({
  type: events.loadObjectDetails,
  area
});
export const successLoadObjectDetails = object => ({
  type: events.successLoadObjectDetails,
  object
});
export const errorLoadObjectDetails = error => ({
  type: events.errorLoadObjectDetails,
  error
});

export const closeObjectDetails = () => ({
  type: events.closeObjectDetails
});

export const unsetObjectDetails = () => ({
  type: events.unsetObjectDetails
});
