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
  const updatedStateChunk = Object.fromEntries([[keys.highlighted, area]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleSetZone(prevState, { id, geometry }) {
  const addedZone = {
    id,
    geometry
  };
  const updatedStateChunk = Object.fromEntries([[keys.zone, addedZone]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleClearZoneData() {
  return { ...initialState };
}

function handleSuccessLoadCadastrialAreas(prevState, { areas }) {
  const updatedAreasId = areas.map(({ id }) => id);
  const updatedAreasData = Object.fromEntries(
    areas.map(({ id, name, properties: { json, ...data } }) => [
      id,
      {
        name,
        ...data
      }
    ])
  );
  const updatedAreasGeometry = Object.fromEntries(
    areas.map(({ id, properties: { json } }) => [id, json])
  );
  const updatedStateChunk = Object.fromEntries([
    [keys.areas, updatedAreasId],
    [keys.areasData, updatedAreasData],
    [keys.areasGeometry, updatedAreasGeometry],
    [keys.areasLoadStatus, loadStatusEnum.success]
  ]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleLoadCadastrialAreas(prevState) {
  const updatedStateChunk = Object.fromEntries([[keys.areasLoadStatus, loadStatusEnum.loading]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleErrorLoadCadastrialAreas(prevState, { error }) {
  const updatedStateChunk = Object.fromEntries([[keys.areasLoadErrorMessage, error.toString()]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleCreateTerritoryCadastrialArea(prevState, { area }) {
  const created = createId();
  const prevAreasId = prevState[keys.areas];
  const updatedAreasId = prevAreasId.concat(created);

  const prevAreasData = prevState[keys.areasData];
  const updatedAreasDataChunk = Object.fromEntries([[created, { created: true }]]);
  const updatedAreasData = {
    ...prevAreasData,
    ...updatedAreasDataChunk
  };

  const prevAreasGeometry = prevState[keys.areasGeometry];
  const updatedAreasGeometryChunk = Object.fromEntries([[created, area]]);
  const updateAreasGeometry = {
    ...prevAreasGeometry,
    ...updatedAreasGeometryChunk
  };

  const updatedStateChunk = Object.fromEntries([
    [keys.areas, updatedAreasId],
    [keys.areasData, updatedAreasData],
    [keys.areasGeometry, updateAreasGeometry]
  ]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleEditTerritoryCadastrialAreas(prevState, { areas }) {
  const prevAreasGeometry = prevState[keys.areasGeometry];
  const updatedAreasGeometryChunk = Object.fromEntries(areas.map(({ id, bounds }) => [id, bounds]));
  const updatedAreasGeometry = {
    ...prevAreasGeometry,
    ...updatedAreasGeometryChunk
  };
  const updatedStateChunk = Object.fromEntries([[keys.areasGeometry, updatedAreasGeometry]]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
}

function handleRemoveTerritoryCadastrialArea(prevState, { area: removed }) {
  const prevAreasId = prevState[keys.areas];
  const prevAreasData = prevState[keys.areasData];
  const prevAreasGeometry = prevState[keys.areasGeometry];

  const updatedAreasId = prevAreasId.filter(area => area !== removed);
  const updatedAreasData = Object.fromEntries(updatedAreasId.map(id => [id, prevAreasData[id]]));
  const updatedAreasGeometry = Object.fromEntries(
    updatedAreasId.map(id => [id, prevAreasGeometry[id]])
  );

  const updatedStateChunk = Object.fromEntries([
    [keys.areas, updatedAreasId],
    [keys.areasData, updatedAreasData],
    [keys.areasGeometry, updatedAreasGeometry]
  ]);
  return {
    ...prevState,
    ...updatedStateChunk
  };
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
