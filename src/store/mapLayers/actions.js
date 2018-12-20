import { events } from './constants';
import { getDefaultLayer } from './helpers';

const defaultLayer = getDefaultLayer();

export const setLayer = (layer, data) => ({
  type: events.setLayer,
  layer,
  data
});

export const setDefaultLayer = setLayer(defaultLayer.type, defaultLayer.data);

export const goPreviousLayer = () => ({
  type: events.goPreviousLayer
});

export const goFutureLayer = () => ({
  type: events.goFutureLayer
});
