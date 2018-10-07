import { combineReducers } from 'redux';

import userStatus from './status/reducer';
import search from './search/reducer';
import legend from './legend/reducer';
import entityInformation from './entityInformation/reducer';
import objectDetails from './objectDetails/reducer';

const rootReducer = combineReducers({
  userStatus,
  search,
  legend,
  entityInformation,
  objectDetails,
});

export default rootReducer;
