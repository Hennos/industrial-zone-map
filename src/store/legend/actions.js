import { events } from './constants';

const loadLegendData =
  () => ({
    type: events.loadLegendData,
  });

const getLoadedLegendData =
  loaded => ({
    type: events.getLoadedLegendData,
    loaded,
  });

const errorLoadLegendData =
  error => ({
    type: events.errorLoadLegendData,
    error,
  });

const invertLegendVisability =
  () => ({
    type: events.invertLegendVisability,
  });

export {
  loadLegendData,
  getLoadedLegendData,
  errorLoadLegendData,
  invertLegendVisability,
};
