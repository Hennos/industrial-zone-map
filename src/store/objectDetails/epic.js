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

import { events } from './constants';
import {
  successLoadObjectDetailsData,
  successLoadObjectDetails,
  errorLoadObjectDetails,
  unsetObjectDetails,
} from './actions';

const jsonObjectDetailsData = JSON.stringify({
  properties: [{
    name: 'address',
    title: 'Адрес',
  }, {
    name: 'cadastralNumber',
    title: 'Кадастровый номер',
  }, {
    name: 'usage',
    title: 'Вид разрешенного использования',
  }, {
    name: 'hazardClass',
    title: 'Класс опасности производства',
  }, {
    name: 'rightHolder',
    title: 'Правообладатель',
  }, {
    name: 'rightFoundation',
    title: 'Основание пользования участком',
  }, {
    name: 'activity',
    title: 'Вид деятельности производства',
  }, {
    name: 'protectionZone',
    title: 'Санитарно-защитная зона',
  }, {
    name: 'connectivityOptions',
    title: 'Возможности подключения',
  }, {
    name: 'reorganization',
    title: 'Градостроительные преобразования',
  }],
});

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

const uriObjectDetailsData = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonObjectDetailsData}`;
const uriObjectDetails = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonObjectDetails}`;

const loadObjectDetailsDataEpic = action$ => action$.pipe(
  ofType(events.loadObjectDetailsData),
  mergeMap(() => ajax.getJSON(uriObjectDetailsData).pipe(
    map(response => successLoadObjectDetailsData(response.data)),
    catchError(error => of(errorLoadObjectDetails(error))),
  )),
);

const loadObjectDetailsEpic = action$ => action$.pipe(
  ofType(events.loadObjectDetails),
  mergeMap(() => ajax.getJSON(uriObjectDetails).pipe(
    map(response => successLoadObjectDetails(response.data)),
    catchError(error => of(errorLoadObjectDetails(error))),
  )),
);

const closeObjectDetailsEpic = action$ => action$.pipe(
  ofType(events.closeObjectDetails),
  delay(500),
  mapTo(unsetObjectDetails()),
);

const epic = combineEpics(
  loadObjectDetailsDataEpic,
  loadObjectDetailsEpic,
  closeObjectDetailsEpic,
);

export default epic;
