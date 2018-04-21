import { delay, mapTo } from 'rxjs';

import events from '../constants/events';
import { pong } from '../actions/test';

const pingEpic = action$ =>
  action$.ofType(events.ping)
    .delay(1000)
    .mapTo(pong());

export default pingEpic;
