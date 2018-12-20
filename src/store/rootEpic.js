import { combineEpics } from 'redux-observable';

import loader from './loader/epic';
import userStatus from './userStatus/epic';
import legend from './legend/epic';
import search from './search/epic';
import entityInformation from './entityInformation/epic';
import objectDetails from './objectDetails/epic';
import mapLayerCity from './mapLayerCity/epic';
import mapLayerZone from './mapLayerZone/epic';
import areaEditor from './areaEditor/epic';
import areaCreation from './areaCreation/epic';

const rootEpic = combineEpics(
  loader,
  userStatus,
  legend,
  search,
  entityInformation,
  objectDetails,
  mapLayerCity,
  mapLayerZone,
  areaEditor,
  areaCreation
);

export default rootEpic;
