import { events } from './constants';

export const chooseIndustrialZone = zone => ({
  type: events.chooseIndustrialZone,
  zone
});

export const cityLayerSet = layer => ({
  type: events.cityLayerSet,
  layer
});
export const clearCityData = () => ({
  type: events.clearCityData
});

export const loadIndustrialZones = () => ({
  type: events.loadIndustrialZones
});
export const successLoadIndustrialZones = zones => ({
  type: events.successLoadIndustrialZones,
  zones
});
export const errorLoadIndustrialZones = error => ({
  type: events.errorLoadIndustrialZones,
  error
});
