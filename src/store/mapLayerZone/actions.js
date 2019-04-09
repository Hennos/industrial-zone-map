import { events } from './constants';

export const showArea = (zone, area) => ({
  type: events.showArea,
  zone,
  area
});
export const highlightArea = area => ({
  type: events.highlightArea,
  area
});

export const setZone = (id, geometry) => ({
  type: events.setZone,
  id,
  geometry
});

export const zoneLayerSet = (layer, data) => ({
  type: events.zoneLayerSet,
  layer,
  data
});
export const clearZoneData = () => ({
  type: events.clearZoneData
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

export const loadIndustrialZone = zone => ({
  type: events.loadIndustrialZone,
  zone
});
export const successLoadIndustrialZone = zone => ({
  type: events.successLoadIndustrialZone,
  zone
});
export const errorLoadIndustrialZone = error => ({
  type: events.errorLoadIndustrialZone,
  error
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
