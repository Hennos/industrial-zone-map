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

export {
  loadLegendData,
  getLoadedLegendData,
  errorLoadLegendData,
};
