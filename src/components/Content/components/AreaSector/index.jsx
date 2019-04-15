import React from 'react';
import PropTypes from 'prop-types';
import { Polygon, Popup } from 'react-leaflet';
import { connect } from 'react-redux';

import AreaInformation from '../AreaInformation';

import { mapStateToProps, mapDispatchToProps } from './mapToProps';

const AreaSector = ({ id, coordinates, data, editable, highlighted, ...actions }) => (
  <Polygon id={id} color={highlighted ? 'blue' : 'red'} positions={coordinates}>
    <Popup>
      <AreaInformation id={id} editable={editable} data={data} {...actions} />
    </Popup>
  </Polygon>
);

AreaSector.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.array).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  editable: PropTypes.bool,
  highlighted: PropTypes.bool,
  onRequestDetails: PropTypes.func.isRequired,
  onRequestEdit: PropTypes.func.isRequired,
  onRequestEditCreated: PropTypes.func.isRequired
};

AreaSector.defaultProps = {
  data: {},
  editable: false,
  highlighted: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AreaSector);
