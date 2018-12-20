const layers = Object.freeze({
  zone: 'zone',
  city: 'city'
});

const events = Object.freeze({
  setLayer: '@@MAP_LAYER:SET_LAYER',
  setDefaultLayer: '@@MAP_LAYER:SET_DEFAULT',
  goPreviousLayer: '@@MAP_LAYER:GO_PREVIOUS_LAYER',
  goFutureLayer: '@@MAP_LAYER:GO_FUTURE_LAYER'
});

const keys = Object.freeze({
  previous: 'previous',
  current: 'current',
  future: 'future'
});

export { layers, events, keys };
