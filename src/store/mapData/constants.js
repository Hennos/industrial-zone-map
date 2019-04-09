const layers = Object.freeze({
  zone: 'zone',
  city: 'city'
});

const events = Object.freeze({
  setInitializeLayer: '@@MAP_DATA:SET_INITIALIZE_LAYER',
  setBoundsGeometry: '@@MAP_DATA:SET_BOUNDS_GEOMETRY'
});

const keys = Object.freeze({
  boundsGeometry: 'boundsGeometry'
});

export { layers, events, keys };
