import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, catchError, filter, flatMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { events } from './constants';
import {
  setZone,
  loadCadastrialAreas,
  successLoadCadastrialAreas,
  errorLoadCadastrialAreas
} from './actions';
import { layers, events as layersEvents } from '../mapLayers/constants';

const setZoneEpic = action$ =>
  action$.pipe(
    ofType(layersEvents.setLayer),
    filter(({ layer: current }) => current === layers.zone),
    flatMap(({ data }) => [setZone(data.id, data.geometry), loadCadastrialAreas(data.id)])
  );

const requestAreasConfigurator = zone =>
  JSON.stringify({
    class: 'MapEntity',
    properties: ['address', 'cadastral_number', 'id_usage', 'json'],
    filters: [
      {
        operation: 'is',
        property: 'id_zone',
        value: zone
      }
    ]
  });
const requestAreasURI = areas =>
  `http://industry.specom-vm.ru/map_interface.php?action=enumerate&data=${areas}`;
const loadCadastrialAreasEpic = action$ =>
  action$.pipe(
    ofType(events.loadCadastrialAreas),
    mergeMap(({ zone }) =>
      ajax.getJSON(requestAreasURI(requestAreasConfigurator(zone))).pipe(
        map(({ objects }) => successLoadCadastrialAreas(objects)),
        catchError(error => of(errorLoadCadastrialAreas(error)))
      )
    )
  );

const epic = combineEpics(setZoneEpic, loadCadastrialAreasEpic);

export default epic;
