import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
  mergeMap,
  map,
  takeUntil,
  catchError,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { events } from './constants';
import { getLoadedLegendData, errorLoadLegendData } from './actions';

const json = JSON.stringify({
  records: [{
    icon: '',
    description: 'Зона среднеэтажной и многоэтажной жилой застройки' +
      ' с включением объектов общественно деловой застройки, а также' +
      ' объектов инженерной инфраструктуры, связанных с обслуживанием данной зоны',
  }, {
    icon: '',
    description: 'Запись в легенде карты',
  }, {
    icon: '',
    description: 'Запись в легенде карты',
  }, {
    icon: '',
    description: 'Зона среднеэтажной и многоэтажной жилой застройки' +
      ' с включением объектов общественно деловой застройки, а также' +
      ' объектов инженерной инфраструктуры, связанных с обслуживанием данной зоны',
  }],
});

const uri = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${json}`;

const requestDataEpic = () => ajax.getJSON(uri).pipe(
  map(response => getLoadedLegendData(response)),
  catchError(error => of(errorLoadLegendData(error))),
);

const epic = action$ => action$.pipe(
  ofType(events.loadLegendData),
  mergeMap(requestDataEpic),
  takeUntil(action$.pipe(ofType(events.getLoadedLegendData))),
);

export default epic;
