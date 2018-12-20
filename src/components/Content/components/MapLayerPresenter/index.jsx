import { layers } from '../../../../store/mapLayers/constants';

import createPresenter from '../createPresenter';

import MapLayerCity from '../MapLayerCity';
import MapLayerZone from '../MapLayerZone';

const presented = {};

presented[layers.city] = MapLayerCity;
presented[layers.zone] = MapLayerZone;

const DataLayerPresenter = createPresenter(presented);

export default DataLayerPresenter;
