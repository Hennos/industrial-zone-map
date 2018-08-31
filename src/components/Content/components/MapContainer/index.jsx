import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import MapComponent from '../MapComponent';

const MapContainer = ({ stylization }) => (
  <div className={classNames(stylization)}>
    <MapComponent />
  </div>
);

MapContainer.propTypes = {
  stylization: PropTypes.string,
};

MapContainer.defaultProps = {
  stylization: '',
};

export default MapContainer;
