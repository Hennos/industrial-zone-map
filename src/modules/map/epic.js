import { mapTo } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { events } from './constants';
import { setToken } from './actions';

import connection from '../../constants/connection';

const tokenEpic = action =>
  action.ofType(events.requestToken)
    .mapTo(setToken(connection.map));

export default combineEpics(tokenEpic);
