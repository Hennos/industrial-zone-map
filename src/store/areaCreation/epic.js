import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { map, mapTo, flatMap, mergeMap, catchError, filter } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { keys as areaCreationKeys, events as areaCreationEvents } from './constants';
import { keys as mapZoneKeys } from '../mapLayerZone/constants';
import { events as loaderEvents } from '../loader/constants';
import { events as areaEditorEvents } from '../areaEditor/constants';
import {
  closeAreaCreation,
  openAreaCreation,
  setAreaPropertiesData,
  unsetCreatedArea,
  requestPublishCreatedCadastrialArea,
  requestPublishCreatedCadastrialAreaProps,
  requestPublishCreatedCadastrialAreaPhoto,
  successPublishCreatedCadastrialArea,
  errorPublishCreatedCadastrialArea
} from './actions';
import { removeTerritoryCadastrialArea } from '../mapLayerZone/actions';

const publishCreatedAreaEpic = action$ =>
  action$.pipe(
    ofType(areaCreationEvents.publishCreatedCadastrialArea),
    map(({ area }) => requestPublishCreatedCadastrialArea(area))
  );
const removeCadastrialAreaEpic = action$ =>
  action$.pipe(
    ofType(areaCreationEvents.removeCreatedCadastrialArea),
    flatMap(({ area }) => [removeTerritoryCadastrialArea(area), closeAreaCreation()])
  );

const closeAreaCreationEpic = action$ =>
  action$.pipe(
    ofType(areaCreationEvents.closeAreaCreation),
    mapTo(unsetCreatedArea())
  );

const openAreaCreationEpic = action$ =>
  action$.pipe(
    ofType(areaCreationEvents.setCreatedArea),
    mapTo(openAreaCreation())
  );

const collapseAreaCreationEpic = action$ =>
  action$.pipe(
    ofType(areaCreationEvents.successPublishCreatedCadastrialArea, areaEditorEvents.openAreaEditor),
    mapTo(closeAreaCreation())
  );

const setAreaPropertiesDataEpic = action$ =>
  action$.pipe(
    ofType(loaderEvents.successLoadAreaPropertries),
    map(({ data }) => setAreaPropertiesData(data.properties))
  );

const requestPublishCreatedAreaEpic = action$ =>
  action$.pipe(
    ofType(areaCreationEvents.requestPublishCreatedCadastrialArea),
    map(({ area }) => requestPublishCreatedCadastrialAreaProps(area))
  );

const requestPublishCreatedAreaPropsConfigurator = (zone, props, geo) =>
  JSON.stringify({
    class: 'MapEntity',
    properties: Object.assign({}, props, {
      id_zone: zone,
      json: geo,
      is_published: 1
    })
  });
const requestPublishCreatedAreaPropsURI = area =>
  `http://industry.aonords.ru/map_interface.php?action=create&data=${area}`;
const requestPublishCreatedAreaPropsEpic = (action$, state$) =>
  action$.pipe(
    ofType(areaCreationEvents.requestPublishCreatedCadastrialAreaProps),
    mergeMap(({ area }) =>
      ajax
        .getJSON(
          requestPublishCreatedAreaPropsURI(
            requestPublishCreatedAreaPropsConfigurator(
              state$.value.mapLayerZone.get(mapZoneKeys.zone),
              state$.value.areaCreation.get(areaCreationKeys.propsValue).toObject(),
              state$.value.mapLayerZone.get(mapZoneKeys.areasGeoData).get(area)
            )
          )
        )
        .pipe(
          map(response => requestPublishCreatedCadastrialAreaPhoto(response.id)),
          catchError(error => of(errorPublishCreatedCadastrialArea(error)))
        )
    )
  );

// TODO: Исправить запрос по типу epic в areaEditor
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
    ofType(areaCreationEvents.requestPublishCreatedCadastrialAreaPhoto),
    filter(() => state$.value.areaCreation.get(areaCreationKeys.propsValue).get('photos') !== null),
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
            body: state$.value.areaEditor.get(areaCreationKeys.propsValue).get('photos')
          }).pipe(
            map(response => successPublishCreatedCadastrialArea(response)),
            catchError(error => of(errorPublishCreatedCadastrialArea(error)))
          )
        ),
        catchError(error => of(errorPublishCreatedCadastrialArea(error)))
      )
    )
  );

const epic = combineEpics(
  publishCreatedAreaEpic,
  removeCadastrialAreaEpic,
  closeAreaCreationEpic,
  openAreaCreationEpic,
  collapseAreaCreationEpic,
  setAreaPropertiesDataEpic,
  requestPublishCreatedAreaEpic,
  requestPublishCreatedAreaPropsEpic,
  requestModifyAreaPhotoEpic
);

export default epic;
