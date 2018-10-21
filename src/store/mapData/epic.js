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

const uriIndustrialZones =
  'http://industry.specom-vm.ru/map_interface.php?action=enumerate&data={"class":"Zone","properties":["json"]}';
const loadIndustrialZonesEpic = action$ => action$.pipe(
  ofType(events.loadIndustrialZones),
  mergeMap(() => ajax.getJSON(uriIndustrialZones).pipe(
    map(response => successLoadIndustrialZones(response.objects)),
    catchError(error => of(errorLoadIndustrialZones(error))),
  )),
);

const requestAreasConfigurator = zone =>
  JSON.stringify({
    class: 'MapEntity',
    properties: [
      'address',
      'cadastral_number',
      'id_usage',
      'json',
    ],
    filters: [{
      operation: 'is',
      property: 'id_zone',
      value: zone,
    }],
  });
const requestAreasURI =
  areas => `http://industry.specom-vm.ru/map_interface.php?action=enumerate&data=${areas}`;
const loadCadastrialAreasEpic = action$ => action$.pipe(
  ofType(events.loadCadastrialAreas),
  mergeMap(({ zone }) => ajax.getJSON(requestAreasURI(requestAreasConfigurator(zone))).pipe(
    map(({ objects }) => successLoadCadastrialAreas(objects)),
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
