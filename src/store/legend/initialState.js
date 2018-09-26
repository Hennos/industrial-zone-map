import Immutable from 'immutable';

import { keys } from './constants';

const initialLegendRecordsData = Immutable.Map([
  [1, {
    description: 'Зона среднеэтажной и многоэтажной жилой застройки' +
      ' с включением объектов общественно деловой застройки, а также' +
      ' объектов инженерной инфраструктуры, связанных с обслуживанием данной зоны',
  }],
  [2, {
    description: 'Запись в легенде карты',
  }],
  [3, {
    description: 'Запись в легенде карты',
  }],
  [4, {
    description: 'Зона среднеэтажной и многоэтажной жилой застройки' +
      ' с включением объектов общественно деловой застройки, а также' +
      ' объектов инженерной инфраструктуры, связанных с обслуживанием данной зоны',
  }],
]);

const initialState = Immutable.Map([
  [keys.legendRecords, Immutable.List([
    1, 2, 3, 4,
  ])],
  [keys.legendRecordsData, initialLegendRecordsData],
]);

export default initialState;
