import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  mapTo,
  flatMap,
  delay,
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { events } from './constants';
import {
  successLoadPropertiesData,
  errorLoadProperties,
  openAreaEditor,
  closeAreaEditor,
  startAreaEditing,
  stopAreaEditing,
} from './actions';
import { removeTerritoryCadastrialArea } from '../mapData/actions';

const jsonPropertiesData = JSON.stringify({
  properties: [{
    name: 'address',
    type: 'input',
    title: 'Адрес',
  }, {
    name: 'cadastralNumber',
    type: 'input',
    title: 'Кадастровый номер',
  }, {
    name: 'usage',
    type: 'input',
    title: 'Вид разрешенного использования',
  }, {
    name: 'hazardClass',
    type: 'input',
    title: 'Класс опасности производства',
  }, {
    name: 'rightHolder',
    type: 'input',
    title: 'Правообладатель',
  }, {
    name: 'rightFoundation',
    type: 'input',
    title: 'Основание пользования участком',
  }, {
    name: 'activity',
    type: 'input',
    title: 'Вид деятельности производства',
  }, {
    name: 'protectionZone',
    type: 'input',
    title: 'Санитарно-защитная зона',
  }, {
    name: 'connectivityOptions',
    type: 'select',
    title: 'Возможности подключения',
    options: [{
      name: 'gasSupply',
      title: 'Газоснабжение',
    }, {
      name: 'waterSupply',
      title: 'Водоснабжение',
    }, {
      name: 'waterDrainage',
      title: 'Водоотведение',
    }, {
      name: 'heatSupply',
      title: 'Теплоснабжение',
    }, {
      name: 'powerSupply',
      title: 'Электроснабжение',
    }],
  }, {
    name: 'gasSupply',
    type: 'range',
    title: 'Газоснабжение',
    units: 'м³/сутки',
  }, {
    name: 'waterSupply',
    type: 'range',
    title: 'Водоснабжение',
    units: 'м³/сутки',
  }, {
    name: 'waterDrainage',
    type: 'range',
    title: 'Водоотведение',
    units: 'м³/сутки',
  }, {
    name: 'heatSupply',
    type: 'range',
    title: 'Теплоснабжение',
    units: 'Гкал/час',
  }, {
    name: 'powerSupply',
    type: 'range',
    title: 'Электроснабжение',
    units: 'кВТ',
  }, {
    name: 'reorganization',
    type: 'dates',
    title: 'Градостроительные преобразования',
  }],
});

const jsonAreaPropertiesValue = JSON.stringify({
  id: 1,
  name: 'Someone value',
  properties: {
    district: 'Приморский',
    address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
    cadastralNumber: '78:07:0003005:245',
    usage: ['промышленные сооружения'],
    hazardClass: 1,
    rightHolder: 'ООО РадиалПро',
    protectionZone: 3,
    activity: 'научно-техническое',
    rightFoundation: null,
    connectivityOptions: [{
      name: 'waterSupply',
      title: 'Водоснабжение',
    }, {
      name: 'waterDrainage',
      title: 'Водоотведение',
    }, {
      name: 'heatSupply',
      title: 'Теплоснабжение',
    }],
    reorganization: null,
  },
});

const uriPropertiesData = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonPropertiesData}`;
const uriAreaPropertiesValue = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonAreaPropertiesValue}`;

const loadPropertiesDataEpic = action$ => action$.pipe(
  ofType(events.loadPropertiesData),
  mergeMap(() => ajax.getJSON(uriPropertiesData).pipe(
    map(response => successLoadPropertiesData(response.data.properties)),
    catchError(error => of(errorLoadProperties(error))),
  )),
);

// const loadAreaPropertiesValueEpic = action$ => action$.pipe(
//   ofType(events.loadAreaPropertiesValue),
//   mergeMap(() => ajax.getJSON(uriAreaPropertiesValue).pipe(
//     map(response => successLoadAreaPropertiesValue(response.data)),
//     catchError(error => of(errorLoadProperties(error))),
//   )),
// );

const removeCadastrialAreaEpic = action$ => action$.pipe(
  ofType(events.removeCadastrialArea),
  flatMap(({ area }) => [removeTerritoryCadastrialArea(area), stopAreaEditing()]),
);

const startEditingEpic = action$ => action$.pipe(
  ofType(events.loadAreaPropertiesValue),
  delay(100),
  mapTo(openAreaEditor()),
);

const stopEditingEpic = action$ => action$.pipe(
  ofType(events.stopAreaEditing),
  mapTo(closeAreaEditor()),
);

const epic = combineEpics(
  loadPropertiesDataEpic,
  removeCadastrialAreaEpic,
  stopEditingEpic,
  startEditingEpic,
);

export default epic;
