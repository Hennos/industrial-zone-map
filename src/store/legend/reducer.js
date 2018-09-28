import Immutable from 'immutable';

import { events, keys } from './constants';
import initialState from './initialState';

const createId = (() => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
})();

const handleGetLoadedLegendData = (prevState, { loaded }) => {
  const legendRecordPresenter = legendRecord => ({
    icon: legendRecord.icon,
    description: legendRecord.description,
  });

  const { records } = loaded.data;
  const legendRecordsData = Immutable.Map(records.map(record => [
    createId(),
    legendRecordPresenter(record),
  ]));
  const legendRecords = Immutable.List(legendRecordsData.keys());

  return prevState
    .set(keys.legendRecords, legendRecords)
    .set(keys.legendRecordsData, legendRecordsData)
    .set(keys.loadStatus, 'SUCCESSFULL');
};

const handleErrorLoadLegendData = (prevState, action) =>
  prevState
    .set(keys.loadErrorMessage, action.error.toString())
    .set(keys.loadStatus, 'FAILED');

const handlers = new Map([
  [events.getLoadedLegendData, handleGetLoadedLegendData],
  [events.errorLoadLegendData, handleErrorLoadLegendData],
]);

export default function (state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
