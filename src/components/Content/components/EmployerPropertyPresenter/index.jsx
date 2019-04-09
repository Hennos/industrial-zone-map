import React from 'react';
import PropTypes from 'prop-types';

import { employerObjectPropsEnum } from '../../../../store/objectDetails/constants';

import AnyObjectProperty from '../AnyObjectProperty';

const EmployerPropertyPresenter = ({ stylization, name, data, value }) => {
  switch (name) {
    default:
      return <AnyObjectProperty stylization={stylization} data={data} value={value} />;
  }
};

EmployerPropertyPresenter.propTypes = {
  stylization: PropTypes.string,
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired
};

EmployerPropertyPresenter.defaultProps = {
  stylization: ''
};

export default EmployerPropertyPresenter;
