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
      choosed={value.map(option => option.title)}
      options={data.options.map(option => option.title)}
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

const shapeElementValue = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

SelectEditableProperty.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
  value: PropTypes.arrayOf(PropTypes.shape(shapeElementValue)),
  onChange: PropTypes.func,
};

SelectEditableProperty.defaultProps = {
  stylization: '',
  value: [],
  onChange: () => {},
};

export default SelectEditableProperty;
