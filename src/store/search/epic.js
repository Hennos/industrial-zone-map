import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { events as loaderEvents } from '../loader/constants';
import { events as searchEvents } from './constants';
import {
  setFiltersData,
  getFoundObjects,
  errorGetFoundObjects,
} from './actions';

const setFiltersDataEpic = action$ => action$.pipe(
  ofType(loaderEvents.successLoadFilters),
  map(({ data }) => setFiltersData(data.records)),
);

const jsonFoundObjects = JSON.stringify({
  objects: [{
    id: 1,
    name: 'test',
    properties: {
      address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
      cadastrialNumber: '78:07:0003005:245',
      usage: ['промышленные сооружения'],
    },
  }, {
    id: 2,
    name: 'test',
    properties: {
      address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
      cadastrialNumber: '78:07:0003005:245',
      usage: ['промышленные сооружения'],
    },
  }, {
    id: 3,
    name: 'test',
    properties: {
      address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
      cadastrialNumber: '78:07:0003005:245',
      usage: ['промышленные сооружения'],
    },
  }, {
    id: 4,
    name: 'test',
    properties: {
      address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
      cadastrialNumber: '78:07:0003005:245',
      usage: ['промышленные сооружения'],
    },
  }, {
    id: 5,
    name: 'test',
    properties: {
      address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
      cadastrialNumber: '78:07:0003005:245',
      usage: ['промышленные сооружения'],
    },
  }, {
    id: 6,
    name: 'test',
    properties: {
      address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
      cadastrialNumber: '78:07:0003005:245',
      usage: ['промышленные сооружения'],
    },
  }],
});
const uriFoundObjects = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonFoundObjects}`;

const loadFoundObjectsEpic = action$ => action$.pipe(
  ofType(searchEvents.requestSearchObjects),
  mergeMap(() => ajax.getJSON(uriFoundObjects).pipe(
    map(response => getFoundObjects(response.data.objects)),
    catchError(error => of(errorGetFoundObjects(error))),
  )),
);

const epic = combineEpics(
  setFiltersDataEpic,
  loadFoundObjectsEpic,
);

export default epic;
