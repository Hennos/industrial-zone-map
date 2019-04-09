import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, mapTo, delay, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { events as loaderEvents } from '../loader/constants';
import { events as objectDetailsEvents } from './constants';
import {
  setAreaPropertiesData,
  successLoadObjectDetails,
  errorLoadObjectDetails,
  successLoadAreaPhotos,
  errorLoadAreaPhotos,
  unsetObjectDetails
} from './actions';

const setAreaPropertiesDataEpic = action$ =>
  action$.pipe(
    ofType(loaderEvents.successLoadAreaPropertries),
    map(({ data }) => setAreaPropertiesData(data.properties))
  );

const requestAreaConfigurator = id =>
  JSON.stringify({
    id,
    class: 'MapEntity'
  });
const requestAreaURI = area =>
  `http://industry.aonords.ru/map_interface.php?action=get&data=${area}`;
const loadObjectDetailsEpic = action$ =>
  action$.pipe(
    ofType(objectDetailsEvents.loadObjectDetails),
    mergeMap(({ area }) =>
      ajax.getJSON(requestAreaURI(requestAreaConfigurator(area))).pipe(
        map(data => successLoadObjectDetails(data)),
        catchError(error => of(errorLoadObjectDetails(error)))
      )
    )
  );

const requestAreaPhotosConfigurator = id =>
  JSON.stringify({
    class: 'Photo',
    filters: [
      {
        operation: 'is',
        property: 'id_mapentity',
        value: id
      }
    ],
    properties: ['photo']
  });
const requestAreaPhotosURI = area =>
  `http://industry.aonords.ru/map_interface.php?action=enumerate&data=${area}`;
const loadAreaPhotosEpic = action$ =>
  action$.pipe(
    ofType(objectDetailsEvents.loadObjectDetails),
    mergeMap(({ area }) =>
      ajax.getJSON(requestAreaPhotosURI(requestAreaPhotosConfigurator(area))).pipe(
        map(data => successLoadAreaPhotos(data.objects)),
        catchError(error => of(errorLoadAreaPhotos(error)))
      )
    )
  );

const closeObjectDetailsEpic = action$ =>
  action$.pipe(
    ofType(objectDetailsEvents.closeObjectDetails),
    delay(500),
    mapTo(unsetObjectDetails())
  );

const epic = combineEpics(
  setAreaPropertiesDataEpic,
  loadObjectDetailsEpic,
  loadAreaPhotosEpic,
  closeObjectDetailsEpic
);

export default epic;
