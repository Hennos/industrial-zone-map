import { keys } from './constants';

// const initialState = Immutable.Map([
//   [keys.id, null],
//   [keys.ready, false],
//   [keys.properties, Immutable.List()],
//   [keys.propsData, Immutable.Map()],
//   [keys.propsValue, Immutable.Map()]
// ]);

const initialState = Object.fromEntries([
  [keys.id, null],
  [keys.ready, false],
  [keys.properties, []],
  [keys.propsData, {}],
  [keys.propsValue, {}]
]);

export default initialState;
