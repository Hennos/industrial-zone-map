import { combineReducers } from 'redux';

import search from './search/reducer';
import legend from './legend/reducer';

const rootReducer = combineReducers({
  search,
  legend,
});

export default rootReducer;
