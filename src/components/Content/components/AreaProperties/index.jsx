import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

import AreaPropertyPresenter from '../AreaPropertyPresenter';

const AreaProperties = ({ stylization, properties }) => {
  const validProperties = properties.filter(({ value }) => value !== null);
  return (
    validProperties.length > 0 && (
      <div className={classNames('area-properties', stylization)}>
        {validProperties.map(({ name, data, value }) => (
          <AreaPropertyPresenter
            key={name}
            stylization="area-properties-element"
            name={name}
            data={data}
            value={value}
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

AreaProperties.propTypes = {
  stylization: PropTypes.string,
  properties: PropTypes.arrayOf(PropTypes.shape(shapeProps)).isRequired
};

AreaProperties.defaultProps = {
  stylization: ''
};

export default AreaProperties;
