const events = Object.freeze({
  setLegendData: '@@LEGEND:SET_LEGEND_DATA',
  invertLegendVisability: '@@LEGEND:INVERT_LEGEND_VISABILITY',
});

const keys = Object.freeze({
  legendRecords: 'legendRecords',
  legendRecordsData: 'legendRecordsData',
  legendVisability: 'legendVisability',
});

export { events, keys };
