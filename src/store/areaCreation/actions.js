import { events } from './constants';

export const publishCreatedCadastrialArea =
  area => ({
    type: events.publishCreatedCadastrialArea,
    area,
  });
export const saveCreatedCadastrialArea =
  area => ({
    type: events.saveCreatedCadastrialArea,
    area,
  });
export const removeCreatedCadastrialArea =
  area => ({
    type: events.removeCreatedCadastrialArea,
    area,
  });

export const closeAreaCreation =
  () => ({
    type: events.closeAreaCreation,
  });
export const openAreaCreation =
  () => ({
    type: events.openAreaCreation,
  });

export const updateAreaPropertyValue =
  (name, value) => ({
    type: events.updateAreaPropertyValue,
    name,
    value,
  });

export const setAreaPropertiesData =
  properties => ({
    type: events.setAreaPropertiesData,
    properties,
  });

export const setCreatedArea =
  area => ({
    type: events.setCreatedArea,
    area,
  });
export const unsetCreatedArea =
  () => ({
    type: events.unsetCreatedArea,
  });

export const requestPublishCreatedCadastrialArea =
  area => ({
    type: events.requestPublishCreatedCadastrialArea,
    area,
  });
export const successPublishCreatedCadastrialArea =
  response => ({
    type: events.successPublishCreatedCadastrialArea,
    response,
  });
export const errorPublishCreatedCadastrialArea =
  error => ({
    type: events.errorPublishCreatedCadastrialArea,
    error,
  });
