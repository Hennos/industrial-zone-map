import { events } from './constants';

const resetMap =
  () => ({
    type: events.resetMap,
  });

const chooseIndustrialZone =
  zone => ({
    type: events.chooseIndustrialZone,
    zone,
  });

const loadIndustrialZones =
  () => ({
    type: events.loadIndustrialZones,
  });

const successLoadIndustrialZones =
  zones => ({
    type: events.successLoadIndustrialZones,
    zones,
  });

const errorLoadIndustrialZones =
  error => ({
    type: events.errorLoadIndustrialZones,
    error,
  });

const loadCadastrialAreas =
  zone => ({
    type: events.loadCadastrialAreas,
    zone,
  });

const successLoadCadastrialAreas =
  areas => ({
    type: events.successLoadCadastrialAreas,
    areas,
  });

const errorLoadCadastrialAreas =
  error => ({
    type: events.errorLoadCadastrialAreas,
    error,
  });

const createTerritoryCadastrialArea =
  area => ({
    type: events.createTerritoryCadastrialArea,
    area,
  });

const editTerritoryCadastrialAreas =
  areas => ({
    type: events.editTerritoryCadastrialAreas,
    areas,
  });

const removeTerritoryCadastrialArea =
  area => ({
    type: events.removeTerritoryCadastrialArea,
    area,
  });

export {
  resetMap,
  chooseIndustrialZone,
  loadIndustrialZones,
  successLoadIndustrialZones,
  errorLoadIndustrialZones,
  loadCadastrialAreas,
  successLoadCadastrialAreas,
  errorLoadCadastrialAreas,
  createTerritoryCadastrialArea,
  editTerritoryCadastrialAreas,
  removeTerritoryCadastrialArea,
};
