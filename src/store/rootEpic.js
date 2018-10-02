import { combineEpics } from 'redux-observable';

import legend from './legend/epic';
import search from './search/epic';
import entityInformation from './entityInformation/epic';
import objectDetails from './objectDetails/epic';

const rootEpic = combineEpics(
  legend,
  search,
  entityInformation,
  objectDetails,
);

export default rootEpic;
