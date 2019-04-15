import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';

import EmployerObjectInformation from '../EmployerObjectInformation';

import { mapStateToProps, mapDispatchToProps } from './mapToProps';

import marker from './marker.svg';

const AreaObject = ({ id, coordinates, data, editable, highlighted, ...handlers }) => (
  <Marker
    id={id}
    color={highlighted ? 'blue' : 'red'}
    positions={coordinates}
    icon={L.icon({ iconUrl: marker })}
    position={coordinates}
  >
    <Popup>
      <EmployerObjectInformation id={id} editable={editable} data={data} {...handlers} />
    </Popup>
  </Marker>
);

AreaObject.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  editable: PropTypes.bool,
  highlighted: PropTypes.bool,
  onRequestDetails: PropTypes.func.isRequired,
  onRequestEdit: PropTypes.func.isRequired
};

AreaObject.defaultProps = {
  data: {},
  editable: false,
  highlighted: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AreaObject);
