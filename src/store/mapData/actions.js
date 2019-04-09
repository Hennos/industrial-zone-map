import { events } from './constants';

export const setInitializeLayer = () => ({
  type: events.setInitializeLayer
});

export const setBoundsGeometry = geometry => ({
  type: events.setBoundsGeometry,
  geometry
});
