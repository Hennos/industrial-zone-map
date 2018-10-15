import { combineEpics } from 'redux-observable';

import userStatus from './userStatus/epic';
import legend from './legend/epic';
import search from './search/epic';
import entityInformation from './entityInformation/epic';
import objectDetails from './objectDetails/epic';
import mapData from './mapData/epic';
import areaEditor from './areaEditor/epic';

const rootEpic = combineEpics(
  userStatus,
  legend,
  search,
  entityInformation,
  objectDetails,
  mapData,
  areaEditor,
);

export default rootEpic;
