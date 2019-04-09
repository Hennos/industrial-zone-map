import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import EditablePropertyPresenter from '../EditablePropertyPresenter';

const EditableAreaProperties = ({ stylization, properties, onChangeProperty }) => (
  <div className={classNames('editable-area-properties', stylization)}>
    {properties.map(({ name, type, ...otherProps }) => (
      <EditablePropertyPresenter
        key={name}
        presented={type}
        stylization="editable-area-properties-property"
        {...otherProps}
        onChange={newValue => onChangeProperty(name, newValue)}
      />
    ))}
  </div>
);

const shapeProperty = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

EditableAreaProperties.propTypes = {
  stylization: PropTypes.string,
  properties: PropTypes.arrayOf(PropTypes.shape(shapeProperty)).isRequired,
  onChangeProperty: PropTypes.func.isRequired
};

EditableAreaProperties.defaultProps = {
  stylization: ''
};

export default EditableAreaProperties;
