import { combineEpics } from 'redux-observable';

import userStatus from './status/epic';
import legend from './legend/epic';
import search from './search/epic';
import entityInformation from './entityInformation/epic';
import objectDetails from './objectDetails/epic';
import mapData from './mapData/epic';

const rootEpic = combineEpics(
  userStatus,
  legend,
  search,
  entityInformation,
  objectDetails,
  mapData,
);

export default rootEpic;
