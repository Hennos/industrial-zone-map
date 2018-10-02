import { mapTo } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { events as eventsObjectDetails } from '../objectDetails/constants';
import {
  accessToObjectDetailsBlock,
  accessToSearchBlock,
} from './actions';

const requestObjectDetailsBlockEpic = action$ => action$.pipe(
  ofType(eventsObjectDetails.loadObjectDetails),
  mapTo(accessToObjectDetailsBlock()),
);

const closeObjectDetailsBlockEpic = action$ => action$.pipe(
  ofType(eventsObjectDetails.closeObjectDetails),
  mapTo(accessToSearchBlock()),
);

const epic = combineEpics(
  requestObjectDetailsBlockEpic,
  closeObjectDetailsBlockEpic,
);

export default epic;
