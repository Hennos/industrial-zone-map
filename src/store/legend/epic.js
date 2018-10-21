import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { events as loaderEvents } from '../loader/constants';
import { setLegendData } from './actions';

const epic = action$ => action$.pipe(
  ofType(loaderEvents.successLoadLegend),
  map(({ data }) => setLegendData(data.records)),
);

export default epic;
