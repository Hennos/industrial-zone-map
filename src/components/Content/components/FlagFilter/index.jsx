import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import FlagDropList from '../FlagDropList';

const FlagFilter = ({ stylization, value, onChange, data: { title, options } }) => (
  <div className={classNames(stylization, 'flag-filter')}>
    {title}:{' '}
    <FlagDropList
      stylization="flag-filter-drop-list"
      choosed={value}
      options={options}
      onChange={onChange}
    />
  </div>
);

const shapeElementData = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

FlagFilter.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};

FlagFilter.defaultProps = {
  stylization: '',
  value: null,
  onChange: () => {}
};

export default FlagFilter;
