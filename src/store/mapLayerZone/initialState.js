import { loadStatusEnum, keys } from './constants';

const createInitialState = () =>
  Object.fromEntries([
    [keys.zone, null],
    [keys.highlighted, null],
    [keys.areas, []],
    [keys.areasData, {}],
    [keys.areasGeometry, {}],
    [keys.areasLoadStatus, loadStatusEnum.none],
    [keys.areasLoadErrorMessage, '']
  ]);

export default createInitialState;
