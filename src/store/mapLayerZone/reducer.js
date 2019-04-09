import Immutable from 'immutable';

import { loadStatusEnum, events, keys } from './constants';
import createInitialState from './initialState';

const initialState = createInitialState();

const createId = (() => {
  let id = 0;
  return () => {
    id += 1;
    return `local_${id}`;
  };
})();

function handleHighlightArea(prevState, { area }) {
  return prevState.set(keys.highlighted, area);
}

function handleSetZone(prevState, { id, geometry }) {
  return prevState.set(keys.zone, {
    id,
    geometry
  });
}

function handleClearZoneData() {
  return createInitialState();
}

function handleSuccessLoadCadastrialAreas(prevState, { areas }) {
  const areasId = Immutable.List(areas.map(({ id }) => id));
  const areasDataEntities = areas.map(({ id, name, properties }) => {
    const { json, ...data } = properties;
    return {
      data: [id, Object.assign({ name }, data)],
      geometry: [id, json]
    };
  });
  const areasData = Immutable.Map(areasDataEntities.map(({ data }) => data));
  const areasGeoData = Immutable.Map(areasDataEntities.map(({ geometry }) => geometry));
  return prevState
    .set(keys.areas, areasId)
    .set(keys.areasData, areasData)
    .set(keys.areasGeoData, areasGeoData)
    .set(keys.areasLoadStatus, loadStatusEnum.success);
}

function handleLoadCadastrialAreas(prevState) {
  return prevState.set(keys.areasLoadStatus, loadStatusEnum.loading);
}

function handleErrorLoadCadastrialAreas(prevState, { error }) {
  return prevState.set(keys.areasLoadErrorMessage, error.toString());
}

function handleCreateTerritoryCadastrialArea(prevState, { area }) {
  const id = createId();
  const updatedAreas = prevState.get(keys.areas).push(id);
  const updatedAreasData = prevState.get(keys.areasData).set(id, {
    created: true
  });
  const updatedAreasGeoData = prevState.get(keys.areasGeoData).set(id, area);
  return prevState
    .set(keys.areas, updatedAreas)
    .set(keys.areasData, updatedAreasData)
    .set(keys.areasGeoData, updatedAreasGeoData);
}

function handleEditTerritoryCadastrialAreas(prevState, { areas }) {
  const newEditedAreasGeoData = Immutable.Map(areas.map(({ id, bounds }) => [id, bounds]));
  const updatedAreasGeoData = prevState.get(keys.areasGeoData).merge(newEditedAreasGeoData);
  return prevState.set(keys.areasGeoData, updatedAreasGeoData);
}

function handleRemoveTerritoryCadastrialArea(prevState, { area: removed }) {
  const updatedAreas = prevState.get(keys.areas).filter(area => area !== removed);
  const updatedAreasData = prevState.get(keys.areasData).delete(removed);
  const updatedAreasGeoData = prevState.get(keys.areasGeoData).delete(removed);
  return prevState
    .set(keys.areas, updatedAreas)
    .set(keys.areasData, updatedAreasData)
    .set(keys.areasGeoData, updatedAreasGeoData);
}

const handlers = new Map([
  [events.highlightArea, handleHighlightArea],
  [events.setZone, handleSetZone],
  [events.clearZoneData, handleClearZoneData],
  [events.loadCadastrialAreas, handleLoadCadastrialAreas],
  [events.successLoadCadastrialAreas, handleSuccessLoadCadastrialAreas],
  [events.errorLoadCadastrialAreas, handleErrorLoadCadastrialAreas],
  [events.createTerritoryCadastrialArea, handleCreateTerritoryCadastrialArea],
  [events.editTerritoryCadastrialAreas, handleEditTerritoryCadastrialAreas],
  [events.removeTerritoryCadastrialArea, handleRemoveTerritoryCadastrialArea]
]);

export default function(state = initialState, action) {
  const handleAction = handlers.get(action.type);

  if (typeof handleAction === 'function') {
    return handleAction(state, action);
  }

  return state;
}
