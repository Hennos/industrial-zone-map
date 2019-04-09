import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, filter, flatMap, catchError } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import { events } from './constants';
import {
  clearCityData,
  cityLayerSet,
  loadIndustrialZones,
  successLoadIndustrialZones,
  errorLoadIndustrialZones
} from './actions';
import { layers, events as mapEvents } from '../mapData/constants';
import { setBoundsGeometry } from '../mapData/actions';
import { events as layersEvents } from '../mapLayers/constants';
import { setLayer } from '../mapLayers/actions';

const setCityAsDefaultLayer = action$ =>
  action$.pipe(
    ofType(mapEvents.setInitializeLayer),
    flatMap(() => [
      setLayer(layers.city, {}),
      setBoundsGeometry({
        type: 'Polygon',
        coordinates: [
          [
            [30.563964843750004, 60.101825866222],
            [29.64935302734375, 60.10319489936693],
            [29.64797973632813, 59.7916529165298],
            [30.563964843750004, 59.78888893931431],
            [30.563964843750004, 60.101825866222]
          ]
        ]
      })
    ])
  );

const watchChangeLayerEpic = action$ =>
  action$.pipe(
    ofType(layersEvents.setLayer),
    flatMap(({ layer }) => [clearCityData(), cityLayerSet(layer)])
  );

const setCityEpic = action$ =>
  action$.pipe(
    ofType(layersEvents.setLayer),
    filter(({ layer }) => layer === layers.city),
    map(() => loadIndustrialZones())
  );

const chooseIndustrialZoneEpic = action$ =>
  action$.pipe(
    ofType(events.chooseIndustrialZone),
    map(({ zone }) =>
      setLayer(layers.zone, {
        id: zone
      })
    )
  );

const uriIndustrialZones =
  'http://industry.aonords.ru/map_interface.php?action=enumerate&data={"class":"Zone","properties":["json"]}';
const loadIndustrialZonesEpic = action$ =>
  action$.pipe(
    ofType(events.loadIndustrialZones),
    mergeMap(() =>
      ajax.getJSON(uriIndustrialZones).pipe(
        map(response => successLoadIndustrialZones(response.objects)),
        catchError(error => of(errorLoadIndustrialZones(error)))
      )
    )
  );

const epic = combineEpics(
  watchChangeLayerEpic,
  setCityAsDefaultLayer,
  setCityEpic,
  chooseIndustrialZoneEpic,
  loadIndustrialZonesEpic
);

export default epic;
