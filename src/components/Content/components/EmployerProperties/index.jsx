import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

import EmployerPropertyPresenter from '../EmployerPropertyPresenter';

const EmployerProperties = ({ stylization, properties }) => {
  const validProperties = properties.filter(({ value }) => value !== null);
  return (
    validProperties.length > 0 && (
      <div className={classNames('employer-properties', stylization)}>
        {validProperties.map(({ name, ...otherProps }) => (
          <EmployerPropertyPresenter
            key={name}
            stylization="employer-properties-element"
            name={name}
            {...otherProps}
          />
        ))}
      </div>
    )
  );
};

const shapeProps = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any
};

EmployerProperties.propTypes = {
  stylization: PropTypes.string,
  properties: PropTypes.arrayOf(PropTypes.shape(shapeProps)).isRequired
};

EmployerProperties.defaultProps = {
  stylization: ''
};

export default EmployerProperties;
