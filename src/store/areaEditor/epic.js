import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { map, mergeMap, catchError, mapTo, flatMap, filter } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { keys as areaEditorKeys, events as areaEditorEvents } from './constants';
import { events as loaderEvents } from '../loader/constants';
import { keys as mapZoneKeys } from '../mapLayerZone/constants';
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
  requestModifyAreaProps,
  requestModifyAreaPhoto,
  successPublishCadastrialArea,
  errorPublishCadastrialArea,
  requestRemoveCadastrialArea,
  successRemoveCadastrialArea,
  errorRemoveCadastrialArea
} from './actions';
import { removeTerritoryCadastrialArea } from '../mapLayerZone/actions';

const publishCadastrialAreaEpic = action$ =>
  action$.pipe(
    ofType(areaEditorEvents.publishChangesCadastrialArea),
    map(({ area }) => requestPublishCadastrialArea(area))
  );

const removeCadastrialAreaEpic = action$ =>
  action$.pipe(
    ofType(areaEditorEvents.removeCadastrialArea),
    flatMap(({ area }) => [
      requestRemoveCadastrialArea(area),
      removeTerritoryCadastrialArea(area),
      closeAreaEditor()
    ])
  );

const closeEditorEpic = action$ =>
  action$.pipe(
    ofType(areaEditorEvents.closeAreaEditor),
    mapTo(unsetAreaPropertiesValue())
  );

const openEditorEpic = action$ =>
  action$.pipe(
    ofType(areaEditorEvents.successLoadAreaPropertiesValue),
    mapTo(openAreaEditor())
  );

const openAreaCreationEpic = action$ =>
  action$.pipe(
    ofType(areaCreationEvents.openAreaCreation),
    mapTo(closeAreaEditor())
  );

const setAreaPropertiesDataEpic = action$ =>
  action$.pipe(
    ofType(loaderEvents.successLoadAreaPropertries),
    map(({ data }) => setAreaPropertiesData(data.properties))
  );

const requestLoadAreaPropertiesValueEpic = action$ =>
  action$.pipe(
    ofType(areaEditorEvents.requestLoadAreaPropertiesValue),
    map(({ area }) => loadAreaPropertiesValue(area))
  );

const setAreaPropertiesValueEpic = action$ =>
  action$.pipe(
    ofType(areaEditorEvents.successLoadAreaPropertiesValue),
    map(({ data }) => setAreaPropertiesValue(data))
  );

const requestAreaConfigurator = id =>
  JSON.stringify({
    id,
    class: 'MapEntity'
  });
const requestAreaURI = area =>
  `http://industry.aonords.ru/map_interface.php?action=get&data=${area}`;
const loadAreaPropertiesValueEpic = action$ =>
  action$.pipe(
    ofType(areaEditorEvents.loadAreaPropertiesValue),
    mergeMap(({ area }) =>
      ajax.getJSON(requestAreaURI(requestAreaConfigurator(area))).pipe(
        map(data => successLoadAreaPropertiesValue(data)),
        catchError(error => of(errorLoadAreaPropertiesValue(error)))
      )
    )
  );

const requestPublishAreaEpic = action$ =>
  action$.pipe(
    ofType(areaEditorEvents.requestPublishCadastrialArea),
    flatMap(({ area }) => [requestModifyAreaProps(area), requestModifyAreaPhoto(area)])
  );

const modifyAreaPropsConfigurator = (id, props, geo) =>
  JSON.stringify({
    id,
    class: 'MapEntity',
    properties: Object.assign({}, props, {
      json: geo,
      is_published: 1
    })
  });
const requestModifyAreaPropsURI = area =>
  `http://industry.aonords.ru/map_interface.php?action=modify&data=${area}`;
const requestModifyAreaPropsEpic = (action$, state$) =>
  action$.pipe(
    ofType(areaEditorEvents.requestModifyAreaProps),
    mergeMap(({ area }) =>
      ajax
        .getJSON(
          requestModifyAreaPropsURI(
            modifyAreaPropsConfigurator(
              area,
              state$.value.areaEditor
                .get(areaEditorKeys.propsValue)
                .filter(value => value !== null)
                .delete('photos')
                .toObject(),
              state$.value.mapLayerZone.get(mapZoneKeys.areasGeoData).get(area)
            )
          )
        )
        .pipe(
          map(response => successPublishCadastrialArea(response)),
          catchError(error => of(errorPublishCadastrialArea(error)))
        )
    )
  );

const requestCreateAreaPhotoURI = data =>
  `http://industry.aonords.ru/map_interface.php?action=create&data=${data}`;
const createAreaPhotoConfigurator = id =>
  JSON.stringify({
    class: 'Photo',
    properties: {
      id_mapentity: id
    }
  });
const requestModifyAreaPhotoURI = data =>
  `http://industry.aonords.ru/map_interface.php?action=modify&data=${data}`;
const modifyAreaPhotoConfigurator = id =>
  JSON.stringify({
    id,
    class: 'Photo'
  });
const requestModifyAreaPhotoEpic = (action$, state$) =>
  action$.pipe(
    ofType(areaEditorEvents.requestModifyAreaPhoto),
    filter(() => state$.value.areaEditor.get(areaEditorKeys.propsValue).get('photos') != null),
    mergeMap(({ area }) =>
      ajax(requestCreateAreaPhotoURI(createAreaPhotoConfigurator(area))).pipe(
        filter(response => !!response.id),
        mergeMap(({ id }) =>
          ajax({
            url: requestModifyAreaPhotoURI(modifyAreaPhotoConfigurator(id)),
            method: 'POST',
            headers: {
              enctype: `multipart/form-data`
            },
            body: state$.value.areaEditor.get(areaEditorKeys.propsValue).get('photos')
          }).pipe(
            map(response => successPublishCadastrialArea(response)),
            catchError(error => of(errorPublishCadastrialArea(error)))
          )
        ),
        catchError(error => of(errorPublishCadastrialArea(error)))
      )
    )
  );

const removeAreaConfigurator = area => {
  console.log(`Удаление участка: ${area}`);
  return JSON.stringify({
    id: area,
    class: 'MapEntity'
  });
};
const requestRemoveAreaURI = area =>
  `http://industry.aonords.ru/map_interface.php?action=delete&data=${area}`;
const requestRemoveAreaEpic = action$ =>
  action$.pipe(
    ofType(areaEditorEvents.requestRemoveCadastrialArea),
    mergeMap(({ area }) =>
      ajax.getJSON(requestRemoveAreaURI(removeAreaConfigurator(area))).pipe(
        map(response => successRemoveCadastrialArea(response)),
        catchError(error => of(errorRemoveCadastrialArea(error)))
      )
    )
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
  requestModifyAreaPropsEpic,
  requestModifyAreaPhotoEpic,
  requestRemoveAreaEpic
);

export default epic;
