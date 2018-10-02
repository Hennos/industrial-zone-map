import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const ZoneDetails = ({ stylization }) => (
  <div className={classNames(stylization, 'objects-information')} />
);

ZoneDetails.propTypes = {
  stylization: PropTypes.string,
};

ZoneDetails.defaultProps = {
  stylization: '',
};

export default ZoneDetails;
