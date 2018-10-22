import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import EditablePropertyPresenter from '../EditablePropertyPresenter';

const EditableAreaProperties = ({ stylization, properties, onChangeProperty }) => (
  <div className={classNames('editable-area-properties', stylization)}>
    {properties
      .filter(({ data }) => data.type !== 'dates')
      .map(property => (
        <EditablePropertyPresenter
          key={property.name}
          stylization="editable-area-properties-property"
          {...property}
          onChange={newValue => onChangeProperty(property.name, newValue)}
        />
    ))}
  </div>
);

const shapeProperty = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  value: PropTypes.any,
};

EditableAreaProperties.propTypes = {
  stylization: PropTypes.string,
  properties: PropTypes.arrayOf(PropTypes.shape(shapeProperty)).isRequired,
  onChangeProperty: PropTypes.func.isRequired,
};

EditableAreaProperties.defaultProps = {
  stylization: '',
};

export default EditableAreaProperties;
