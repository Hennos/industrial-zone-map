import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
  mergeMap,
  map,
  mapTo,
  delay,
  catchError,
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { events as loaderEvents } from '../loader/constants';
import { events as objectDetailsEvents } from './constants';
import {
  setAreaPropertiesData,
  successLoadObjectDetails,
  errorLoadObjectDetails,
  unsetObjectDetails,
} from './actions';

const setAreaPropertiesDataEpic = action$ => action$.pipe(
  ofType(loaderEvents.successLoadAreaPropertries),
  map(({ data }) => setAreaPropertiesData(data.properties)),
);

const requestAreaConfigurator = id =>
  JSON.stringify({
    id,
    class: 'MapEntity',
  });
const requestAreaURI = area => `http://industry.specom-vm.ru/map_interface.php?action=get&data=${area}`;
const loadObjectDetailsEpic = action$ => action$.pipe(
  ofType(objectDetailsEvents.loadObjectDetails),
  mergeMap(({ area }) => ajax.getJSON(requestAreaURI(requestAreaConfigurator(area))).pipe(
    map(data => successLoadObjectDetails(data)),
    catchError(error => of(errorLoadObjectDetails(error))),
  )),
);

const closeObjectDetailsEpic = action$ => action$.pipe(
  ofType(objectDetailsEvents.closeObjectDetails),
  delay(500),
  mapTo(unsetObjectDetails()),
);

const epic = combineEpics(
  setAreaPropertiesDataEpic,
  loadObjectDetailsEpic,
  closeObjectDetailsEpic,
);

export default epic;
