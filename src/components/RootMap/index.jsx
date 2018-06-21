import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import './index.css';

class RootMap extends React.Component {
  constructor(props) {
    super(props);

    this.token = 'pk.eyJ1IjoiaGVubm9zIiwiYSI6ImNpeTV0dnQxdjAwMXozMm82OWg5Zmp0NHAifQ.suQs7bdNBxg5Q8_stqjOaA';

    this.center = [59.9342802, 30.12979159];
    this.zoom = 10;
  }

  render() {
    return (
      <Map id="root-map" center={this.center} zoom={this.zoom}>
        <TileLayer
          url="https://api.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}"
          mapId="mapbox.streets"
          attribution="&copy; Mapbox Street contributors"
          minZoom={10}
          token={this.token}
        />
      </Map>
    );
  }
}

export default RootMap;
