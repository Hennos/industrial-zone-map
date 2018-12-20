import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import SelectDropList from '../SelectDropList';

const SelectFilter = ({ stylization, value, onChange, data: { title, options } }) => (
  <div className={classNames(stylization, 'select-filter')}>
    {title}:{' '}
    <SelectDropList
      stylization="select-filter-drop-list"
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

SelectFilter.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
};

SelectFilter.defaultProps = {
  stylization: '',
  value: [],
  onChange: () => {}
};

export default SelectFilter;
