import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { events } from './constants';
import { getLoadedObjectDetails, errorLoadObjectDetails } from './actions';

const json = JSON.stringify({
  id: 1,
  name: 'Someone value',
  properties: {
    district: 'Приморский район',
    address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
    cadastralNumber: '78:07:0003005:245',
    area: 'area',
    usage: ['промышленные сооружения'],
    hazardClass: 1,
    protectionZone: 3,
    activity: 'научно-техническое',
    reorganization: '',
    rightHolder: 'ООО РадиалПро',
    rightFoundation: 'rightFoundation',
    gasSupply: '956',
    waterSupply: '784',
    waterDrainage: '632',
    heatSupply: '123',
    powerSupply: '234',
  },
});

const uri = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${json}`;

const requestDataEpic = () => ajax.getJSON(uri).pipe(
  map(response => getLoadedObjectDetails(response)),
  catchError(error => of(errorLoadObjectDetails(error))),
);

const epic = action$ => action$.pipe(
  ofType(events.loadObjectDetails),
  mergeMap(requestDataEpic),
);

export default epic;
