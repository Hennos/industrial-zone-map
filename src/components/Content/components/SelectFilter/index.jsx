import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import SelectDropList from '../SelectDropList';

const SelectFilter = ({
  stylization,
  value,
  data,
  onChange,
}) => (
  <div className={classNames(stylization, 'select-filter')}>
    {data.title}: <SelectDropList
      stylization="select-filter-drop-list"
      choosed={value.choosed || []}
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
  choosed: PropTypes.arrayOf(PropTypes.string),
};

SelectFilter.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
  value: PropTypes.shape(shapeElementValue),
  onChange: PropTypes.func,
};

SelectFilter.defaultProps = {
  stylization: '',
  value: {},
  onChange: () => {},
};

export default SelectFilter;
