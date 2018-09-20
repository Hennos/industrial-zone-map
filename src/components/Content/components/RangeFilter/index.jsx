import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const RangeFilter = ({ stylization, data }) => {
  const { title, units } = data;

  const LowerRange = () => <input className="range-input" />;
  const UpperRange = () => <input className="range-input" />;

  return (
    <div className={classNames(stylization, 'range-filter')}>
      {title} ({units}) от <LowerRange /> до <UpperRange />
    </div>
  );
};

const shapeElementData = {
  title: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
};

RangeFilter.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
};

RangeFilter.defaultProps = {
  stylization: '',
};

export default RangeFilter;
