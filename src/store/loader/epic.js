import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  flatMap,
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { events } from './constants';
import {
  loadLegend,
  successLoadLegend,
  errorLoadLegend,
  loadUserStatus,
  successLoadUserStatus,
  errorLoadUserStatus,
  loadAreaPropertries,
  successLoadAreaPropertries,
  errorLoadAreaPropertries,
  loadFilters,
  successLoadFilters,
  errorLoadFilters,
} from './actions';

const jsonLegendData = JSON.stringify({
  records: [{
    icon: '',
    description: 'Зона среднеэтажной и многоэтажной жилой застройки' +
      ' с включением объектов общественно деловой застройки, а также' +
      ' объектов инженерной инфраструктуры, связанных с обслуживанием данной зоны',
  }, {
    icon: '',
    description: 'Зона среднеэтажной и многоэтажной жилой застройки' +
      ' с включением объектов общественно деловой застройки, а также' +
      ' объектов инженерной инфраструктуры, связанных с обслуживанием данной зоны',
  }],
});
const uriLegendData = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonLegendData}`;

const loadLegendEpic = action$ => action$.pipe(
  ofType(events.loadLegend),
  mergeMap(() => ajax.getJSON(uriLegendData).pipe(
    map(({ data }) => successLoadLegend(data)),
    catchError(error => of(errorLoadLegend(error))),
  )),
);

const jsonUserStatusData = JSON.stringify({
  is_authorized: true,
  user_info: {
    id: 1,
    login: 'test',
  },
  user_groups: {
    fl: false,
    ul: false,
    iogv: true,
    admin: true,
    operator: false,
    approved: true,
  },
});
const uriUserStatusData = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonUserStatusData}`;

const loadUserStatusEpic = action$ => action$.pipe(
  ofType(events.loadUserStatus),
  mergeMap(() => ajax.getJSON(uriUserStatusData).pipe(
    map(({ data }) => successLoadUserStatus(data)),
    catchError(error => of(errorLoadUserStatus(error))),
  )),
);

const jsonAreaPropertiesData = JSON.stringify({
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
const uriAreaPropertiesData = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonAreaPropertiesData}`;

const loadAreaPropertiesEpic = action$ => action$.pipe(
  ofType(events.loadAreaPropertries),
  mergeMap(() => ajax.getJSON(uriAreaPropertiesData).pipe(
    map(({ data }) => successLoadAreaPropertries(data)),
    catchError(error => of(errorLoadAreaPropertries(error))),
  )),
);

const jsonFiltersData = JSON.stringify({
  records: [{
    name: 'district',
    property: 'Приоритетный район',
    type: 'select',
    values: [{
      name: 'id_1',
      title: 'первый район',
    }, {
      name: 'id_2',
      title: 'второй район',
    }, {
      name: 'id_3',
      title: 'третий район',
    }, {
      name: 'id_4',
      title: 'четвёртый район',
    }, {
      name: 'id_5',
      title: 'пятый район',
    }],
    default: null,
  }, {
    name: 'area',
    property: 'Площадь земельного участка',
    type: 'range',
    units: 'м²',
    default: null,
  }, {
    name: 'usage',
    property: 'Вид разрешенного использования',
    type: 'check',
    values: [{
      name: 'id_1',
      title: 'первый вид разр. пользования',
    }, {
      name: 'id_2',
      title: 'второй вид разр. пользования',
    }, {
      name: 'id_3',
      title: 'третий вид разр. пользования',
    }, {
      name: 'id_4',
      title: 'четвёртый вид разр. пользования',
    }, {
      name: 'id_5',
      title: 'пятый вид разр. пользования',
    }],
    default: null,
  }, {
    name: 'hazardclass',
    property: 'Класс опасности производства',
    type: 'check',
    values: [{
      name: 'id_1',
      title: 'первый класс опасности',
    }, {
      name: 'id_2',
      title: 'второй класс опасности',
    }, {
      name: 'id_3',
      title: 'третий класс опасности',
    }, {
      name: 'id_4',
      title: 'четвёртый класс опасности',
    }, {
      name: 'id_5',
      title: 'пятый класс опасности',
    }],
    default: null,
  }, {
    name: 'protection_zone',
    property: 'Санитарно-защитная зона',
    type: 'check',
    values: [{
      name: 'id_1',
      title: 'первый вариант зоны',
    }, {
      name: 'id_2',
      title: 'второй вариант зоны',
    }, {
      name: 'id_3',
      title: 'третий вариант зоны',
    }, {
      name: 'id_4',
      title: 'четвёртый вариант зоны',
    }, {
      name: 'id_5',
      title: 'пятый вариант зоны',
    }],
    default: null,
  }, {
    name: 'gas_supply',
    property: 'Газоснабжение',
    type: 'range',
    units: 'м³/сутки',
    default: null,
  }, {
    name: 'water_supply',
    property: 'Водоснабжение',
    type: 'range',
    units: 'м³/сутки',
    default: null,
  }, {
    name: 'water_drainage',
    property: 'Водоотведение',
    type: 'range',
    units: 'м³/сутки',
    default: null,
  }, {
    name: 'heat_supply',
    property: 'Теплоснабжение',
    type: 'range',
    units: 'м³/сутки',
    default: null,
  }, {
    name: 'power_supply',
    property: 'Электроснабжение',
    type: 'range',
    units: 'м³/сутки',
    default: null,
  }],
});
const uriFiltersData = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonFiltersData}`;

const loadFiltersEpic = action$ => action$.pipe(
  ofType(events.loadFilters),
  mergeMap(() => ajax.getJSON(uriFiltersData).pipe(
    map(({ data }) => successLoadFilters(data)),
    catchError(error => of(errorLoadFilters(error))),
  )),
);

const requestLoadAppDataEpic = action$ => action$.pipe(
  ofType(events.requestLoadAppData),
  flatMap(() => [
    loadLegend(),
    loadUserStatus(),
    loadAreaPropertries(),
    loadFilters(),
  ]),
);

const epic = combineEpics(
  requestLoadAppDataEpic,
  loadLegendEpic,
  loadUserStatusEpic,
  loadAreaPropertiesEpic,
  loadFiltersEpic,
);

export default epic;
