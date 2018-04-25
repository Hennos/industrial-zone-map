import React from 'react';
import PropTypes from 'prop-types';
import Leaflet from 'leaflet';

// import Leaflet from 'leaflet';

import './index.css';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.mapTiles = null;
    this.mapData = null;
    this.mapNode = null;
  }

  componentDidMount() {
    this.init(this.mapNode);
  }

  componentWillUnmount() {
    this.state.map.remove();
  }

  getMapConfig() {
    const config = {};
    config.params = {
      center: [59.939095, 30.315868],
      zoom: 10,
    };
    config.tileLayer = {
      uri: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      params: {
        attribution: '&copy; Mapbox Street contributors',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: this.props.token,
      },
    };
    return config;
  }

  init(id) {
    const config = this.getMapConfig();

    const map = Leaflet.map(id, config.params);
    const tileLayer = Leaflet.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

    this.mapData = map;
    this.mapTiles = tileLayer;
  }

  render() {
    return (
      <div ref={node => this.mapNode = node} id="mapid" />
    );
  }
}

Map.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Map;
