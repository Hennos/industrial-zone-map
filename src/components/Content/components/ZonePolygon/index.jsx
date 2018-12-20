import React from 'react';
import PropTypes from 'prop-types';
import { Polygon } from 'react-leaflet';

const ZonePolygon = ({ coordinates, ...polygon }) => (
  <Polygon color="purple" positions={coordinates} {...polygon} />
);

ZonePolygon.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default ZonePolygon;
