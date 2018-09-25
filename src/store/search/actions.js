import { events } from './constants';

const updateSearchFilterValue =
  (id, value) => ({
    type: events.updateSearchFilterValue,
    id,
    value,
  });

export {
  updateSearchFilterValue,
}