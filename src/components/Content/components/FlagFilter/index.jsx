import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import FlagDropList from '../FlagDropList';

const FlagFilter = ({
  stylization,
  value,
  data,
  onChange,
}) => (
  <div className={classNames(stylization, 'flag-filter')}>
    {data.title}: <FlagDropList
      stylization="flag-filter-drop-list"
      choosed={value.choosed || ''}
      options={data.options}
      onChange={onChange}
    />
  </div>
);

const shapeElementData = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};

const shapeElementValue = {
  choosed: PropTypes.string,
};

FlagFilter.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
  value: PropTypes.shape(shapeElementValue),
  onChange: PropTypes.func,
};

FlagFilter.defaultProps = {
  stylization: '',
  value: {},
  onChange: () => {},
};

export default FlagFilter;
