import { events } from './constants';

const setLegendData =
  records => ({
    type: events.setLegendData,
    records,
  });

const invertLegendVisability =
  () => ({
    type: events.invertLegendVisability,
  });

export {
  setLegendData,
  invertLegendVisability,
};
