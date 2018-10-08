import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { events } from './constants';
import {
  successLoadIndustrialZones,
  errorLoadIndustrialZones,
  loadCadastrialAreas,
  successLoadCadastrialAreas,
  errorLoadCadastrialAreas,
} from './actions';

const jsonIndustrialZones = JSON.stringify({
  objects: [{
    id: 1,
    properties: {
      name: 'Конная Лахта',
      json: JSON.stringify({
        type: 'Polygon',
        coordinates: [[
          [59.99086145, 30.16367251],
          [60.00326509, 30.15998179],
          [60.00682652, 30.13234431],
          [59.99468739, 30.13037443],
        ]],
      }),
    },
  }, {
    id: 2,
    properties: {
      name: 'Часть территории Морской портово-промышленной зоны',
      json: JSON.stringify({
        type: 'Polygon',
        coordinates: [[
          [59.86350395, 30.15029598],
          [59.84695239, 30.1702087],
          [59.84557272, 30.21278072],
          [59.86384869, 30.23544002],
          [59.87591222, 30.18325496],
        ]],
      }),
    },
  }],
});

const uriIndustrialZones = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonIndustrialZones}`;
const uriCadastrialAreas = 'http://industry.specom-vm.ru/map_interface.php?action=ping&data="{}"';

const loadIndustrialZonesEpic = action$ => action$.pipe(
  ofType(events.loadIndustrialZones),
  mergeMap(() => ajax.getJSON(uriIndustrialZones).pipe(
    map(response => successLoadIndustrialZones(response.data.objects)),
    catchError(error => of(errorLoadIndustrialZones(error))),
  )),
);

const loadCadastrialAreasEpic = action$ => action$.pipe(
  ofType(events.loadCadastrialAreas),
  mergeMap(() => ajax.getJSON(uriCadastrialAreas).pipe(
    map(response => successLoadCadastrialAreas(response.data.objects)),
    catchError(error => of(errorLoadCadastrialAreas(error))),
  )),
);

const chooseIndustrialZone = action$ => action$.pipe(
  ofType(events.chooseIndustrialZone),
  map(action => loadCadastrialAreas(action.zone)),
);

const epic = combineEpics(
  loadIndustrialZonesEpic,
  loadCadastrialAreasEpic,
  chooseIndustrialZone,
);

export default epic;
