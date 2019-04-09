import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { events as loaderEvents } from '../loader/constants';
import { keys as searchKeys, events as searchEvents } from './constants';
import { setFiltersData, getFoundObjects, errorGetFoundObjects } from './actions';

const setFiltersDataEpic = action$ =>
  action$.pipe(
    ofType(loaderEvents.successLoadFilters),
    map(({ data }) => setFiltersData(data.records))
  );

const enumerateSearchConfigurator = (search, filters) =>
  JSON.stringify({
    class: 'MapEntity',
    search,
    search_field: 'address',
    properties: ['id_zone', 'address', 'cadastral_number', 'id_usage', 'json'],
    filters: filters
      .filter(({ value }) => value !== undefined)
      .map(({ property, value, data }) => ({
        property,
        value,
        operation: data.type === 'range' ? 'is_range' : 'is'
      }))
      .toArray()
  });
const requestSearchObjectsURI = request =>
  `http://industry.aonords.ru/map_interface.php?action=enumerate&data=${request}`;
const loadFoundObjectsEpic = (action$, state$) =>
  action$.pipe(
    ofType(searchEvents.requestSearchObjects),
    mergeMap(({ search }) =>
      ajax
        .getJSON(
          requestSearchObjectsURI(
            enumerateSearchConfigurator(
              search,
              state$.value.search.get(searchKeys.filters).map(filter => ({
                property: filter,
                value: state$.value.search.get(searchKeys.filtersValue).get(filter),
                data: state$.value.search.get(searchKeys.filtersData).get(filter)
              }))
            )
          )
        )
        .pipe(
          map(response => getFoundObjects(response.objects)),
          catchError(error => of(errorGetFoundObjects(error)))
        )
    )
  );

const epic = combineEpics(setFiltersDataEpic, loadFoundObjectsEpic);

export default epic;
