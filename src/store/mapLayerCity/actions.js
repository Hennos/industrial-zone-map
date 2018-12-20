import { events } from './constants';

export const setCity = city => ({
  type: events.setCity,
  data: city
});

export const chooseIndustrialZone = zone => ({
  type: events.chooseIndustrialZone,
  zone
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
