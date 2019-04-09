import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const AnyObjectProperty = ({ stylization, data, value }) => (
  <div className={classNames('any-object-property', stylization)}>
    {data.title}: {value}
  </div>
);

const shapeData = {
  title: PropTypes.string.isRequired
};

AnyObjectProperty.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeData).isRequired,
  value: PropTypes.any
};

AnyObjectProperty.defaultProps = {
  stylization: '',
  value: null
};

export default AnyObjectProperty;
