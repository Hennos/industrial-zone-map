import { combineEpics } from 'redux-observable';

import mapEpic from './modules/map/epic';

export default combineEpics(mapEpic);
