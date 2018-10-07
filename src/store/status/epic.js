import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { first, mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { events } from './constants';
import {
  successLoadUserStatus,
  errorLoadUserStatus,
} from './actions';

const jsonUserStatus = JSON.stringify({
  is_authorized: true,
  user_info: {
    id: 1,
    login: 'test',
  },
  user_groups: {
    fl: false,
    ul: false,
    iogv: true,
    admin: true,
    operator: false,
    approved: true,
  },
});

const uriUserStatus = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonUserStatus}`;

const epic = action$ => action$.pipe(
  ofType(events.loadUserStatus),
  first(),
  mergeMap(() => ajax.getJSON(uriUserStatus).pipe(
    map(response => successLoadUserStatus(response.data)),
    catchError(error => of(errorLoadUserStatus(error))),
  )),
);

export default epic;
