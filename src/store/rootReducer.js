import { combineReducers } from 'redux';

import loader from './loader/reducer';
import userStatus from './userStatus/reducer';
import search from './search/reducer';
import legend from './legend/reducer';
import entityInformation from './entityInformation/reducer';
import objectDetails from './objectDetails/reducer';
import mapData from './mapData/reducer';
import areaEditor from './areaEditor/reducer';

const rootReducer = combineReducers({
  loader,
  userStatus,
  search,
  legend,
  entityInformation,
  objectDetails,
  mapData,
  areaEditor,
});

export default rootReducer;
