import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import { Map as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';

import { keys as mapLayersKeys } from '../../../../store/mapLayers/constants';

import './index.css';

import DataLayerPresenter from '../MapLayerPresenter';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.token =
      'pk.eyJ1IjoiaGVubm9zIiwiYSI6ImNpeTV0dnQxdjAwMXozMm82OWg5Zmp0NHAifQ.suQs7bdNBxg5Q8_stqjOaA';
    this.center = [59.9342802, 30.12979159];
    this.zoom = 10;
  }

  // shouldComponentUpdate(nextProps) {
  //   const { layer } = this.props;
  //   const { layer: nextLayer } = nextProps;
  //   if (layer.type !== nextLayer.type) {
  //     return true;
  //   }
  //   return false;
  // }

  render() {
    const { layer } = this.props;
    return (
      <LeafletMap
        key={layer.type}
        id="root-map"
        center={this.center}
        zoom={this.zoom}
        minZoom={this.zoom}
        bounds={layer.bounds}
        maxBounds={layer.bounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://api.tiles.mapbox.com/v4/{mapType}/{z}/{x}/{y}.png?access_token={token}"
          mapType="mapbox.streets"
          token={this.token}
        />
        <ZoomControl position="bottomright" zoomInTitle="Приблизить" zoomOutTitle="Отдалить" />
        <DataLayerPresenter presented={layer.type} />
      </LeafletMap>
    );
  }
}

const objectShape = {
  type: PropTypes.string.isRequired,
  bounds: PropTypes.object.isRequired
};

Map.propTypes = {
  layer: PropTypes.shape(objectShape).isRequired
};

const mapStateToProps = state => {
  const {
    type,
    data: { geometry }
  } = state.mapLayers.get(mapLayersKeys.current);
  return {
    layer: {
      type,
      bounds: L.geoJSON(geometry).getBounds()
    }
  };
};

export default connect(mapStateToProps)(Map);
