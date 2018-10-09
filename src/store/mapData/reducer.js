import Immutable from 'immutable';

import { loadStatusEnum, events, keys } from './constants';
import initialState from './initialState';

function handleResetMap(prevState) {
  return prevState
    .set(keys.activeZone, NaN)
    .set(keys.areas, Immutable.List())
    .set(keys.areasData, Immutable.Map())
    .set(keys.areasGeoData, Immutable.Map())
    .set(keys.areasLoadStatus, loadStatusEnum.none)
    .set(keys.areasLoadErrorMessage, '');
}

function handleChooseIndustrialZone(prevState, { zone }) {
  return prevState
    .set(keys.activeZone, zone);
}

function handleLoadIndustrialZones(prevState) {
  return prevState
    .set(keys.zonesLoadStatus, loadStatusEnum.loading);
}

function handleSuccessLoadIndustrialZones(prevState, { zones }) {
  const zonesId = Immutable.List(zones.map(({ id }) => id));
  const zonesDataEntities = zones.map(({ id, properties }) => {
    const { json, ...data } = properties;
    return {
      data: [id, data],
      bounds: [id, JSON.parse(json)],
    };
  });
  const zonesData = Immutable.Map(zonesDataEntities.map(({ data }) => data));
  const zonesGeoData = Immutable.Map(zonesDataEntities.map(({ bounds }) => bounds));
  return prevState
    .set(keys.zones, zonesId)
    .set(keys.zonesData, zonesData)
    .set(keys.zonesGeoData, zonesGeoData)
    .set(keys.zonesLoadStatus, loadStatusEnum.success);
}

function handleErrorLoadIndustrialZones(prevState, { error }) {
  return prevState
    .set(keys.zonesLoadErrorMessage, error.toString());
}

function handleSuccessLoadCadastrialAreas(prevState, { areas }) {
  const areasId = Immutable.List(areas.map(({ id }) => id));
  const areasDataEntities = areas.map(({ id, properties }) => {
    const { json, ...data } = properties;
    return {
      data: [id, data],
      bounds: [id, JSON.parse(json)],
    };
  });
  const areasData = Immutable.Map(areasDataEntities.map(({ data }) => data));
  const areasGeoData = Immutable.Map(areasDataEntities.map(({ bounds }) => bounds));
  return prevState
    .set(keys.areas, areasId)
    .set(keys.areasData, areasData)
    .set(keys.areasGeoData, areasGeoData)
    .set(keys.areasLoadStatus, loadStatusEnum.success);
}

function handleLoadCadastrialAreas(prevState) {
  return prevState
    .set(keys.areasLoadStatus, loadStatusEnum.loading);
}

function handleErrorLoadCadastrialAreas(prevState, { error }) {
  return prevState
    .set(keys.areasLoadErrorMessage, error.toString());
}

const handlers = new Map([
  [events.resetMap, handleResetMap],
  [events.chooseIndustrialZone, handleChooseIndustrialZone],
  [events.loadIndustrialZones, handleLoadIndustrialZones],
  [events.successLoadIndustrialZones, handleSuccessLoadIndustrialZones],
  [events.errorLoadIndustrialZones, handleErrorLoadIndustrialZones],
  [events.loadCadastrialAreas, handleLoadCadastrialAreas],
  [events.successLoadCadastrialAreas, handleSuccessLoadCadastrialAreas],
  [events.errorLoadCadastrialAreas, handleErrorLoadCadastrialAreas],
]);

export default function (state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
