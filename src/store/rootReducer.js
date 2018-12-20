import { combineReducers } from 'redux';

import loader from './loader/reducer';
import userStatus from './userStatus/reducer';
import search from './search/reducer';
import legend from './legend/reducer';
import entityInformation from './entityInformation/reducer';
import objectDetails from './objectDetails/reducer';
import mapLayers from './mapLayers/reducer';
import mapData from './mapData/reducer';
import areaEditor from './areaEditor/reducer';
import areaCreation from './areaCreation/reducer';

const rootReducer = combineReducers({
  loader,
  userStatus,
  search,
  legend,
  entityInformation,
  objectDetails,
  mapLayers,
  mapData,
  areaEditor,
  areaCreation,
});

export default rootReducer;
