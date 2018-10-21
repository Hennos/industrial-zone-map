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

const handleSetLegendData = (prevState, { records }) => {
  const recordsData = Immutable.Map(records.map(record => [
    createId(), {
      icon: record.icon,
      description: record.description,
    },
  ]));
  const legendRecords = Immutable.List(recordsData.keys());

  return prevState
    .set(keys.legendRecords, legendRecords)
    .set(keys.legendRecordsData, recordsData);
};

const handleInvertLegendVisability = (prevState) => {
  const prevVisability = prevState.get(keys.legendVisability);
  return prevState
    .set(keys.legendVisability, !prevVisability);
};

const handlers = new Map([
  [events.setLegendData, handleSetLegendData],
  [events.invertLegendVisability, handleInvertLegendVisability],
]);

export default function (state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
