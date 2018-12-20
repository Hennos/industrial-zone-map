import { events } from './constants';

export const setZone = (id, geometry) => ({
  type: events.setZone,
  id,
  geometry
});

export const loadCadastrialAreas = zone => ({
  type: events.loadCadastrialAreas,
  zone
});

export const successLoadCadastrialAreas = areas => ({
  type: events.successLoadCadastrialAreas,
  areas
});

export const errorLoadCadastrialAreas = error => ({
  type: events.errorLoadCadastrialAreas,
  error
});

export const createTerritoryCadastrialArea = area => ({
  type: events.createTerritoryCadastrialArea,
  area
});

export const editTerritoryCadastrialAreas = areas => ({
  type: events.editTerritoryCadastrialAreas,
  areas
});

export const removeTerritoryCadastrialArea = area => ({
  type: events.removeTerritoryCadastrialArea,
  area
});
