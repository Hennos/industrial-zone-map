import Immutable from 'immutable';

import { keys } from './constants';


const initialFiltersData = Immutable.Map([
  [1, {
    title: 'Приоритетный район',
    type: 'select',
  }],
  [2, {
    title: 'Площадь земельного участка',
    type: 'range',
    units: 'м²',
  }],
  [3, {
    title: 'Вид разрешенного использования',
    type: 'flag',
  }],
  [4, {
    title: 'Класс опасности производства',
    type: 'flag',
  }],
  [5, {
    title: 'Санитарно-защитная зона',
    type: 'flag',
  }],
  [6, {
    title: 'Газоснабжение',
    type: 'range',
    units: 'м³/сутки',
  }],
  [7, {
    title: 'Водоснабжение',
    type: 'range',
    units: 'м³/сутки',
  }],
  [8, {
    title: 'Водоотведение',
    type: 'range',
    units: 'м³/сутки',
  }],
  [9, {
    title: 'Теплоснабжение',
    type: 'range',
    units: 'Гкал/час',
  }],
  [10, {
    title: 'Электроснабжение',
    type: 'range',
    units: 'кВТ',
  }],
]);

const initialState = Immutable.Map([
  [keys.filters, Immutable.List([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ])],
  [keys.filtersData, initialFiltersData],
  [keys.filtersValue, Immutable.Map()],
]);

export default initialState;
