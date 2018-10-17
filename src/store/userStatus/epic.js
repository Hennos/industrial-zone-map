import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { events as loaderEvents } from '../loader/constants';
import { setUserStatus } from './actions';

const epic = action$ => action$.pipe(
  ofType(loaderEvents.successLoadUserStatus),
  map(({ data }) => setUserStatus(data)),
);

export default epic;
