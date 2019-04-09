import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import { Map as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';

import { keys as mapDataKeys } from '../../../../store/mapData/constants';
import { setInitializeLayer } from '../../../../store/mapData/actions';
import { keys as mapLayersKeys } from '../../../../store/mapLayers/constants';

import './index.css';

import ResetMapControl from '../ResetMapControl';
import DataLayerPresenter from '../MapLayerPresenter';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.token =
      'pk.eyJ1IjoiaGVubm9zIiwiYSI6ImNpeTV0dnQxdjAwMXozMm82OWg5Zmp0NHAifQ.suQs7bdNBxg5Q8_stqjOaA';
    this.center = [59.9342802, 30.12979159];
    this.zoom = 10;
  }

  componentDidMount() {
    const { prepareMap } = this.props;
    prepareMap();
  }

  getLayerBounds() {
    const { boundsGeometry } = this.props;
    return boundsGeometry && L.geoJSON(boundsGeometry).getBounds();
  }

  render() {
    const { loaded, layer } = this.props;
    return (
      loaded && (
        <LeafletMap
          key={layer}
          id="root-map"
          center={this.center}
          zoom={this.zoom}
          minZoom={this.zoom}
          bounds={this.getLayerBounds()}
          maxBounds={this.getLayerBounds()}
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
          <ResetMapControl position="bottomright" />
          <DataLayerPresenter presented={layer} />
        </LeafletMap>
      )
    );
  }
}

Map.propTypes = {
  loaded: PropTypes.bool.isRequired,
  layer: PropTypes.string,
  boundsGeometry: PropTypes.object,
  prepareMap: PropTypes.func.isRequired
};

Map.defaultProps = {
  layer: null,
  boundsGeometry: null
};

const mapStateToProps = state => {
  const loadedLayer = state.mapLayers.get(mapLayersKeys.current);
  const boundsGeometry = state.mapData.get(mapDataKeys.boundsGeometry);
  return loadedLayer != null && boundsGeometry != null
    ? {
        loaded: true,
        layer: loadedLayer.type,
        boundsGeometry
      }
    : {
        loaded: false
      };
};

const mapDispatchToProps = dispatch => ({
  prepareMap: () => dispatch(setInitializeLayer())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
