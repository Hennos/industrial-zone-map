import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
  map,
  mapTo,
  flatMap,
  mergeMap,
  catchError,
  tap,
  ignoreElements,
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { keys as areaCreationKeys, events as areaCreationEvents } from './constants';
import { keys as mapDataKeys, events as mapDataEvents } from '../mapData/constants';
import { events as loaderEvents } from '../loader/constants';
import { events as areaEditorEvents } from '../areaEditor/constants';
import {
  closeAreaCreation,
  openAreaCreation,
  setAreaPropertiesData,
  unsetCreatedArea,
  requestPublishCreatedCadastrialArea,
  successPublishCreatedCadastrialArea,
  errorPublishCreatedCadastrialArea,
} from './actions';
import { removeTerritoryCadastrialArea } from '../mapData/actions';

const publishCreatedAreaEpic = action$ => action$.pipe(
  ofType(areaCreationEvents.publishCreatedCadastrialArea),
  map(({ area }) => requestPublishCreatedCadastrialArea(area)),
);
const removeCadastrialAreaEpic = action$ => action$.pipe(
  ofType(areaCreationEvents.removeCreatedCadastrialArea),
  flatMap(({ area }) => [removeTerritoryCadastrialArea(area), closeAreaCreation()]),
);

const closeAreaCreationEpic = action$ => action$.pipe(
  ofType(areaCreationEvents.closeAreaCreation),
  mapTo(unsetCreatedArea()),
);

const openAreaCreationEpic = action$ => action$.pipe(
  ofType(areaCreationEvents.setCreatedArea),
  mapTo(openAreaCreation()),
);

const collapseAreaCreationEpic = action$ => action$.pipe(
  ofType(
    areaCreationEvents.successPublishCreatedCadastrialArea,
    areaEditorEvents.openAreaEditor,
    mapDataEvents.resetMap,
  ),
  mapTo(closeAreaCreation()),
);

const setAreaPropertiesDataEpic = action$ => action$.pipe(
  ofType(loaderEvents.successLoadAreaPropertries),
  map(({ data }) => setAreaPropertiesData(data.properties)),
);

const areaConfigurator = (zone, props, geo) =>
  JSON.stringify({
    class: 'MapEntity',
    properties: Object.assign({}, props, {
      id_zone: zone,
      json: geo,
      is_published: 1,
    }),
  });
const requestCreateAreaURI = area => `http://industry.specom-vm.ru/map_interface.php?action=create&data=${area}`;
const requestPublishCreatedAreaEpic = (action$, state$) => action$.pipe(
  ofType(areaCreationEvents.requestPublishCreatedCadastrialArea),
  mergeMap(({ area }) => ajax.getJSON(requestCreateAreaURI(areaConfigurator(
    state$.value.mapData.get(mapDataKeys.activeZone),
    state$.value.areaCreation.get(areaCreationKeys.propsValue).toObject(),
    state$.value.mapData.get(mapDataKeys.areasGeoData).get(area),
  ))).pipe(
    map(response => successPublishCreatedCadastrialArea(response)),
    catchError(error => of(errorPublishCreatedCadastrialArea(error))),
  )),
);
const successPublishCreatedAreaEpic = action$ => action$.pipe(
  ofType(areaCreationEvents.successPublishCreatedCadastrialArea),
  tap(({ response }) => console.dir(response)),
  ignoreElements(),
);

const epic = combineEpics(
  publishCreatedAreaEpic,
  removeCadastrialAreaEpic,
  closeAreaCreationEpic,
  openAreaCreationEpic,
  collapseAreaCreationEpic,
  setAreaPropertiesDataEpic,
  requestPublishCreatedAreaEpic,
  successPublishCreatedAreaEpic,
);

export default epic;
