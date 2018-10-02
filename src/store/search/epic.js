import { mapTo, ajax, delay } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { events } from './constants';
import { getLoadedFiltersData } from './actions';

const epic = action$ => action$.pipe(
  ofType(events.loadFiltersData),
  delay(1000),
  mapTo(getLoadedFiltersData({})),
);

export default epic;
