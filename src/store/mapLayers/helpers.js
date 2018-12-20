import { layers } from './constants';

export const getDefaultLayer = () => ({
  type: layers.city,
  data: {
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [29.58237652, 59.78848044],
          [29.57413677, 60.10758148],
          [30.62286516, 60.11556124],
          [30.63673171, 59.78570206]
        ]
      ]
    }
  }
});
