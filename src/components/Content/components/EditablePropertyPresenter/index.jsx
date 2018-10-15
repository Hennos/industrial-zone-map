import React from 'react';
import PropTypes from 'prop-types';

import InputEditableProperty from '../InputEditableProperty';
import RangeEditableProperty from '../RangeEditableProperty';
import SelectEditableProperty from '../SelectEditableProperty';

const EditablePropertyPresenter = ({
  stylization,
  data,
  value,
  onChange,
}) => {
  const mapProperty = {
    input: InputEditableProperty,
    range: RangeEditableProperty,
    select: SelectEditableProperty,
  };
  const { type, ...propertyData } = data;
  const RenderedProperty = mapProperty[type];
  return value !== null ?
    <RenderedProperty
      stylization={stylization}
      data={propertyData}
      value={value}
      onChange={onChange}
    />
    :
    <RenderedProperty
      stylization={stylization}
      data={propertyData}
      onChange={onChange}
    />;
};

const shapeFilterData = {
  type: PropTypes.string.isRequired,
};

EditablePropertyPresenter.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeFilterData).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

EditablePropertyPresenter.defaultProps = {
  stylization: '',
  value: null,
  onChange: () => {},
};

export default EditablePropertyPresenter;
