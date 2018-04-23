import React from 'react';
import PropTypes from 'prop-types';

// import Leaflet from 'leaflet';

import './index.css';

// class Map extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       map: null,
//       tileLayer: null,
//       dataLayer: null
//     };

//     this._mapNode = null;
//   }

//   componentDidMount() {
//     if (!this.state.map) {
//       this.init(this._mapNode);
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (Array.isArray(nextProps.data) && nextProps.data.length) {
//       let dataLayer = Leaflet.geoJSON(nextProps.data).addTo(this.state.map);
//       this.setState({dataLayer: dataLayer});
//     }
//   }

//   componentWillUnmount() {
//     this.state.map.remove();
//   }

//   getMapConfig() {
//     let config = {};
//     config.params = {
//       center: [59.939095, 30.315868],
//       zoom: 10
//     };
//     config.tileLayer = {
//       uri: "https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
//       params: {
//         attribution: '&copy; Mapbox Street contributors',
//         maxZoom: 18,
//         id: 'mapbox.streets',
//         accessToken: this.props.token
//       }
//     };
//     return config;
//   }

//   init(id) {
//     if (this.state.map) {
//       return;
//     }

//     const config = this.getMapConfig();

//     let map = Leaflet.map(id, config.params);
//     map.pm.addControls(config.pmControls);

//     map.pm.Draw.enable('Poly', config.drawMode);

//     const tileLayer = Leaflet.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

//     this.setState({map, tileLayer});
//   }

//   render() {
//     return (
//       <div ref={(node) => this._mapNode = node} id="mapid"></div>
//     )
//   }
// }

function Map({ token }) {
  return <div />;
}

Map.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Map;
