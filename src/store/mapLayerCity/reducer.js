import Immutable from 'immutable';

import { loadStatusEnum, events, keys } from './constants';
import initialState from './initialState';

function handleLoadIndustrialZones(prevState) {
  return prevState.set(keys.zonesLoadStatus, loadStatusEnum.loading);
}

function handleSuccessLoadIndustrialZones(prevState, { zones }) {
  const zonesId = Immutable.List(zones.map(({ id }) => id));
  const zonesDataEntities = zones.map(({ id, properties }) => {
    const { json, ...data } = properties;
    return {
      data: [id, data],
      geometry: [id, json]
    };
  });
  const zonesData = Immutable.Map(zonesDataEntities.map(({ data }) => data));
  const zonesGeoData = Immutable.Map(zonesDataEntities.map(({ geometry }) => geometry));
  return prevState
    .set(keys.zones, zonesId)
    .set(keys.zonesData, zonesData)
    .set(keys.zonesGeoData, zonesGeoData)
    .set(keys.zonesLoadStatus, loadStatusEnum.success);
}

function handleErrorLoadIndustrialZones(prevState, { error }) {
  return prevState.set(keys.zonesLoadErrorMessage, error.toString());
}

const handlers = new Map([
  [events.loadIndustrialZones, handleLoadIndustrialZones],
  [events.successLoadIndustrialZones, handleSuccessLoadIndustrialZones],
  [events.errorLoadIndustrialZones, handleErrorLoadIndustrialZones]
]);

export default function(state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
