import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import SelectDropList from '../SelectDropList';

const SelectEditableProperty = ({
  stylization,
  value,
  data,
  onChange,
}) => (
  <div className={classNames(stylization, 'select-editable-property')}>
    {data.title}: <SelectDropList
      stylization="select-editable-property-drop-list"
      choosed={value}
      options={data.options}
      onChange={onChange}
    />
  </div>
);

const shapeOptionData = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const shapeElementData = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape(shapeOptionData)).isRequired,
};

SelectEditableProperty.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

SelectEditableProperty.defaultProps = {
  stylization: '',
  value: [],
  onChange: () => {},
};

export default SelectEditableProperty;
