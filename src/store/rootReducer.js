import { combineReducers } from 'redux';

import search from './search/reducer';
import legend from './legend/reducer';
import entityInformation from './entityInformation/reducer';
import objectDetails from './objectDetails/reducer';

const rootReducer = combineReducers({
  search,
  legend,
  entityInformation,
  objectDetails,
});

export default rootReducer;
