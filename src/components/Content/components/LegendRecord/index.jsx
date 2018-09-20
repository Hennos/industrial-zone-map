import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const LegendRecord = ({ stylization, data }) => (
  <div className={classNames(stylization, 'legend-record')}>
    <div className="legend-record-icon" />{data.description}
  </div>
);

const shapeElementData = {
  description: PropTypes.string,
};

LegendRecord.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
};

LegendRecord.defaultProps = {
  stylization: '',
};

export default LegendRecord;
