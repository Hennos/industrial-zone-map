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
              state$.value.search[searchKeys.filters].map(filter => {
                const filterValues = state$.value.search[searchKeys.filtersValue];
                const filterDatas = state$.value.search[searchKeys.filtersData];
                return {
                  property: filter,
                  value: filterValues[filter],
                  data: filterDatas[filter]
                };
              })
            )
          )
        )
        .pipe(
          map(response =>
            getFoundObjects(
              response.objects.map(({ id, properties }) => ({
                id,
                properties: {
                  zone: properties.id_zone,
                  address: properties.address,
                  cadastralNumber: properties.cadastral_number,
                  usage: properties.id_usage,
                  enabled: properties.json && properties.json.type !== 'Feature'
                }
              }))
            )
          ),
          catchError(error => of(errorGetFoundObjects(error)))
        )
    )
  );

const epic = combineEpics(setFiltersDataEpic, loadFoundObjectsEpic);

export default epic;
