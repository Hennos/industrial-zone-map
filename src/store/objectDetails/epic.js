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

const jsonObjectDetails = JSON.stringify({
  id: 1,
  name: 'Someone value',
  properties: {
    address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
    cadastralNumber: '78:07:0003005:245',
    area: 'area',
    usage: ['промышленные сооружения'],
    hazardClass: 1,
    protectionZone: 3,
    rightHolder: 'ООО РадиалПро',
    activity: 'научно-техническое',
    rightFoundation: null,
    connectivityOptions: [{
      option: 'waterSupply',
      title: 'Водоснабжение',
    }, {
      option: 'waterDrainage',
      title: 'Водоотведение',
    }, {
      option: 'heatSupply',
      title: 'Теплоснабжение',
    }],
    reorganization: null,
  },
});

const uriObjectDetails = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonObjectDetails}`;

const setAreaPropertiesDataEpic = action$ => action$.pipe(
  ofType(loaderEvents.successLoadAreaPropertries),
  map(({ data }) => setAreaPropertiesData(data.properties)),
);

const loadObjectDetailsEpic = action$ => action$.pipe(
  ofType(objectDetailsEvents.loadObjectDetails),
  mergeMap(() => ajax.getJSON(uriObjectDetails).pipe(
    map(response => successLoadObjectDetails(response.data)),
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
