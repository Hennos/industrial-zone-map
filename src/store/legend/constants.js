const events = Object.freeze({
  loadLegendData: '@@LEGEND:LOAD_LEGEND_DATA',
  getLoadedLegendData: '@@LEGEND:GET_LOADED_LEGEND_DATA',
  errorLoadLegendData: '@@LEGEND:ERROR_LOAD_LEGEND_DATA',
  invertLegendVisability: '@@LEGEND:INVERT_LEGEND_VISABILITY',
});

const keys = Object.freeze({
  loadStatus: 'loadStatus',
  loadErrorMessage: 'loadErrorMessage',
  legendRecords: 'legendRecords',
  legendRecordsData: 'legendRecordsData',
  legendVisability: 'legendVisability',
});

export { events, keys };
