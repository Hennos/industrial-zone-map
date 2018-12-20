import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, filter, flatMap, catchError } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import { events, keys } from './constants';
import {
  setCity,
  loadIndustrialZones,
  successLoadIndustrialZones,
  errorLoadIndustrialZones
} from './actions';
import { layers, events as layersEvents } from '../mapLayers/constants';
import { setLayer } from '../mapLayers/actions';

const setCityEpic = action$ =>
  action$.pipe(
    ofType(layersEvents.setLayer),
    filter(({ layer: current }) => current === layers.city),
    flatMap(({ data }) => [setCity(data.geometry), loadIndustrialZones()])
  );

const chooseIndustrialZoneEpic = (action$, state$) =>
  action$.pipe(
    ofType(events.chooseIndustrialZone),
    map(({ zone }) =>
      setLayer(layers.zone, {
        id: zone,
        geometry: state$.value.mapLayerCity.get(keys.zonesGeoData).get(zone)
      })
    )
  );

const uriIndustrialZones =
  'http://industry.specom-vm.ru/map_interface.php?action=enumerate&data={"class":"Zone","properties":["json"]}';
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

const epic = combineEpics(setCityEpic, chooseIndustrialZoneEpic, loadIndustrialZonesEpic);

export default epic;
