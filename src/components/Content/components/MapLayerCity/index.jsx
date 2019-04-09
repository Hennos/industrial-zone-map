import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import { LayerGroup } from 'react-leaflet';

import { loadStatusEnum, keys as mapLayerKeys } from '../../../../store/mapLayerCity/constants';
import { chooseIndustrialZone } from '../../../../store/mapLayerCity/actions';

import withLoading from '../withLoading';
import ZonePolygon from '../ZonePolygon';

const MapLayerCity = ({ zones, onChooseZone }) => (
  <LayerGroup>
    {zones.map(({ id, ...data }) => (
      <ZonePolygon key={id} onDblclick={() => onChooseZone(id)} {...data} />
    ))}
  </LayerGroup>
);

MapLayerCity.propTypes = {
  zones: PropTypes.object.isRequired,
  onChooseZone: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const zonesLoadStatus = state.mapLayerCity.get(mapLayerKeys.zonesLoadStatus);
  const zones = state.mapLayerCity.get(mapLayerKeys.zones);
  const zonesGeoData = state.mapLayerCity.get(mapLayerKeys.zonesGeoData);
  return {
    loaded: zonesLoadStatus === loadStatusEnum.success,
    zones: zones.map(id => {
      const { coordinates } = zonesGeoData.get(id);
      return {
        id,
        coordinates: L.GeoJSON.coordsToLatLngs(coordinates, 1)
      };
    })
  };
};

const mapDispatchToProps = dispatch => ({
  onChooseZone: zone => {
    dispatch(chooseIndustrialZone(zone));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLoading(MapLayerCity));
