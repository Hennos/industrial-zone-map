import { combineEpics } from 'redux-observable';

import legend from './legend/epic';
import search from './search/epic';

const rootEpic = combineEpics(
  legend,
  search,
);

export default rootEpic;
