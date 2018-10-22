import { events } from './constants';

export const publishChangesCadastrialArea =
  area => ({
    type: events.publishChangesCadastrialArea,
    area,
  });
export const saveChangesCadastrialArea =
  area => ({
    type: events.saveChangesCadastrialArea,
    area,
  });
export const removeCadastrialArea =
  area => ({
    type: events.removeCadastrialArea,
    area,
  });

export const closeAreaEditor =
  () => ({
    type: events.closeAreaEditor,
  });
export const openAreaEditor =
  () => ({
    type: events.openAreaEditor,
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

export const setAreaPropertiesValue =
  area => ({
    type: events.setAreaPropertiesValue,
    area,
  });
export const unsetAreaPropertiesValue =
  () => ({
    type: events.unsetAreaPropertiesValue,
  });

export const requestLoadAreaPropertiesValue =
  area => ({
    type: events.requestLoadAreaPropertiesValue,
    area,
  });
export const loadAreaPropertiesValue =
  area => ({
    type: events.loadAreaPropertiesValue,
    area,
  });
export const successLoadAreaPropertiesValue =
  data => ({
    type: events.successLoadAreaPropertiesValue,
    data,
  });
export const errorLoadAreaPropertiesValue =
  error => ({
    type: events.errorLoadAreaPropertiesValue,
    error,
  });

export const requestPublishCadastrialArea =
  area => ({
    type: events.requestPublishCadastrialArea,
    area,
  });
export const successPublishCadastrialArea =
  response => ({
    type: events.successPublishCadastrialArea,
    response,
  });
export const errorPublishCadastrialArea =
  error => ({
    type: events.errorPublishCadastrialArea,
    error,
  });

export const requestRemoveCadastrialArea =
  area => ({
    type: events.requestRemoveCadastrialArea,
    area,
  });
export const successRemoveCadastrialArea =
  response => ({
    type: events.successRemoveCadastrialArea,
    response,
  });
export const errorRemoveCadastrialArea =
  error => ({
    type: events.errorRemoveCadastrialArea,
    error,
  });
