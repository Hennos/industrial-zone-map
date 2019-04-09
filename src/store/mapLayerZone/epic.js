import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, catchError, filter, flatMap, delay } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { events } from './constants';
import {
  highlightArea,
  setZone,
  clearZoneData,
  zoneLayerSet,
  loadIndustrialZone,
  loadCadastrialAreas,
  successLoadCadastrialAreas,
  errorLoadCadastrialAreas,
  successLoadIndustrialZone,
  errorLoadIndustrialZone
} from './actions';
import { setBoundsGeometry } from '../mapData/actions';
import { layers, events as layersEvents } from '../mapLayers/constants';
import { setLayer } from '../mapLayers/actions';

const showAreaEpic = action$ =>
  action$.pipe(
    ofType(events.showArea),
    map(({ zone, area }) =>
      setLayer(layers.zone, {
        id: zone,
        highlighted: area
      })
    )
  );

const watchChangeLayerEpic = action$ =>
  action$.pipe(
    ofType(layersEvents.setLayer),
    flatMap(({ layer, data }) => [clearZoneData(), zoneLayerSet(layer, data)])
  );

const loadZoneEpic = action$ =>
  action$.pipe(
    ofType(events.zoneLayerSet),
    filter(({ layer: current }) => current === layers.zone),
    flatMap(({ data: { id, highlighted } }) => [loadIndustrialZone(id), highlightArea(highlighted)])
  );

const setZoneEpic = action$ =>
  action$.pipe(
    ofType(events.successLoadIndustrialZone),
    flatMap(({ zone }) => [
      setBoundsGeometry(zone.properties.json),
      setZone(zone.id, zone.properties.json),
      loadCadastrialAreas(zone.id)
    ])
  );

const requestZoneURI = zone =>
  `http://industry.aonords.ru/map_interface.php?action=get&data={"id":${zone},"class":"Zone"}`;
const loadIndustrialZoneEpic = action$ =>
  action$.pipe(
    ofType(events.loadIndustrialZone),
    mergeMap(({ zone }) =>
      ajax.getJSON(requestZoneURI(zone)).pipe(
        map(response => successLoadIndustrialZone(response)),
        catchError(error => of(errorLoadIndustrialZone(error)))
      )
    )
  );

const requestAreasConfigurator = zone =>
  JSON.stringify({
    class: 'MapEntity',
    properties: [
      'address',
      'cadastral_number',
      'id_usage',
      'json',
      'description',
      'phone',
      'fax',
      'email',
      'url',
      'director'
    ],
    filters: [
      {
        operation: 'is',
        property: 'id_zone',
        value: zone
      }
    ]
  });
const requestAreasURI = areas =>
  `http://industry.aonords.ru/map_interface.php?action=enumerate&data=${areas}`;
const loadCadastrialAreasEpic = action$ =>
  action$.pipe(
    ofType(events.loadCadastrialAreas),
    mergeMap(({ zone }) =>
      ajax.getJSON(requestAreasURI(requestAreasConfigurator(zone))).pipe(
        delay(200),
        map(({ objects }) => successLoadCadastrialAreas(objects)),
        catchError(error => of(errorLoadCadastrialAreas(error)))
      )
    )
  );

const epic = combineEpics(
  showAreaEpic,
  watchChangeLayerEpic,
  loadZoneEpic,
  setZoneEpic,
  loadIndustrialZoneEpic,
  loadCadastrialAreasEpic
);

export default epic;
