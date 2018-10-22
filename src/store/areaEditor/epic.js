import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  mapTo,
  flatMap,
  tap,
  ignoreElements,
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { keys as areaEditorKeys, events as areaEditorEvents } from './constants';
import { events as loaderEvents } from '../loader/constants';
import { keys as mapDataKeys } from '../mapData/constants';
import { events as areaCreationEvents } from '../areaCreation/constants';
import {
  setAreaPropertiesData,
  setAreaPropertiesValue,
  unsetAreaPropertiesValue,
  openAreaEditor,
  closeAreaEditor,
  loadAreaPropertiesValue,
  successLoadAreaPropertiesValue,
  errorLoadAreaPropertiesValue,
  requestPublishCadastrialArea,
  successPublishCadastrialArea,
  errorPublishCadastrialArea,
  requestRemoveCadastrialArea,
  successRemoveCadastrialArea,
  errorRemoveCadastrialArea,
} from './actions';
import { removeTerritoryCadastrialArea } from '../mapData/actions';

const publishCadastrialAreaEpic = action$ => action$.pipe(
  ofType(areaEditorEvents.publishChangesCadastrialArea),
  map(({ area }) => requestPublishCadastrialArea(area)),
);

const removeCadastrialAreaEpic = action$ => action$.pipe(
  ofType(areaEditorEvents.removeCadastrialArea),
  flatMap(({ area }) => [
    requestRemoveCadastrialArea(area),
    removeTerritoryCadastrialArea(area),
    closeAreaEditor(),
  ]),
);

const closeEditorEpic = action$ => action$.pipe(
  ofType(areaEditorEvents.closeAreaEditor),
  mapTo(unsetAreaPropertiesValue()),
);

const openEditorEpic = action$ => action$.pipe(
  ofType(areaEditorEvents.successLoadAreaPropertiesValue),
  mapTo(openAreaEditor()),
);

const openAreaCreationEpic = action$ => action$.pipe(
  ofType(areaCreationEvents.openAreaCreation),
  mapTo(closeAreaEditor()),
);

const setAreaPropertiesDataEpic = action$ => action$.pipe(
  ofType(loaderEvents.successLoadAreaPropertries),
  map(({ data }) => setAreaPropertiesData(data.properties)),
);

const requestLoadAreaPropertiesValueEpic = action$ => action$.pipe(
  ofType(areaEditorEvents.requestLoadAreaPropertiesValue),
  map(({ area }) => loadAreaPropertiesValue(area)),
);

const setAreaPropertiesValueEpic = action$ => action$.pipe(
  ofType(areaEditorEvents.successLoadAreaPropertiesValue),
  map(({ data }) => setAreaPropertiesValue(data)),
);

const requestAreaConfigurator = (id) => {
  console.log('Запрос участка');
  console.log(id);
  console.log('Данные закончились');
  return JSON.stringify({
    id,
    class: 'MapEntity',
  });
};
const requestAreaURI = area => `http://industry.specom-vm.ru/map_interface.php?action=get&data=${area}`;
const loadAreaPropertiesValueEpic = action$ => action$.pipe(
  ofType(areaEditorEvents.loadAreaPropertiesValue),
  mergeMap(({ area }) => ajax.getJSON(requestAreaURI(requestAreaConfigurator(area))).pipe(
    map(data => successLoadAreaPropertiesValue(data)),
    catchError(error => of(errorLoadAreaPropertiesValue(error))),
  )),
);

const publishAreaConfigurator = (id, props, geo) =>
  JSON.stringify({
    id,
    class: 'MapEntity',
    properties: Object.assign({}, props, {
      json: geo,
      is_published: 1,
    }),
  });
const requestPublishAreaURI = area => `http://industry.specom-vm.ru/map_interface.php?action=modify&data=${area}`;
const requestPublishAreaEpic = (action$, state$) => action$.pipe(
  ofType(areaEditorEvents.requestPublishCadastrialArea),
  mergeMap(({ area }) => ajax.getJSON(requestPublishAreaURI(publishAreaConfigurator(
    area,
    state$.value.areaEditor.get(areaEditorKeys.propsValue).toObject(),
    state$.value.mapData.get(mapDataKeys.areasGeoData).get(area),
  ))).pipe(
    map(response => successPublishCadastrialArea(response)),
    catchError(error => of(errorPublishCadastrialArea(error))),
  )),
);
const successPublishAreaEpic = action$ => action$.pipe(
  ofType(areaEditorEvents.successPublishCadastrialArea),
  tap(({ response }) => console.dir(response)),
  ignoreElements(),
);

const removeAreaConfigurator = (area) => {
  console.log(`Удаление участка: ${area}`);
  return JSON.stringify({
    id: area,
    class: 'MapEntity',
  });
};
const requestRemoveAreaURI = area => `http://industry.specom-vm.ru/map_interface.php?action=delete&data=${area}`;
const requestRemoveAreaEpic = action$ => action$.pipe(
  ofType(areaEditorEvents.requestRemoveCadastrialArea),
  mergeMap(({ area }) => ajax.getJSON(requestRemoveAreaURI(removeAreaConfigurator(area))).pipe(
    map(response => successRemoveCadastrialArea(response)),
    catchError(error => of(errorRemoveCadastrialArea(error))),
  )),
);
const successRemoveAreaEpic = action$ => action$.pipe(
  ofType(areaEditorEvents.successRemoveCadastrialArea),
  tap(({ response }) => console.dir(response)),
  ignoreElements(),
);

const epic = combineEpics(
  publishCadastrialAreaEpic,
  removeCadastrialAreaEpic,
  closeEditorEpic,
  openEditorEpic,
  setAreaPropertiesDataEpic,
  setAreaPropertiesValueEpic,
  openAreaCreationEpic,
  loadAreaPropertiesValueEpic,
  requestLoadAreaPropertiesValueEpic,
  requestPublishAreaEpic,
  successPublishAreaEpic,
  requestRemoveAreaEpic,
  successRemoveAreaEpic,
);

export default epic;
