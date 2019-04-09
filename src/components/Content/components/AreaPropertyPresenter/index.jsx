import React from 'react';
import PropTypes from 'prop-types';

import { areaPropsEnum } from '../../../../store/objectDetails/constants';

import BadgesObjectProperty from '../BadgesObjectProperty';
import AnyObjectProperty from '../AnyObjectProperty';

const AreaPropertyPresenter = ({ stylization, name, data, value }) => {
  switch (name) {
    case areaPropsEnum.connectivityOptions:
      return <BadgesObjectProperty stylization={stylization} data={data} value={value} />;
    default:
      return <AnyObjectProperty stylization={stylization} data={data} value={value} />;
  }
};

const shapeData = {
  title: PropTypes.string.isRequired
};

AreaPropertyPresenter.propTypes = {
  stylization: PropTypes.string,
  name: PropTypes.string.isRequired,
  data: PropTypes.shape(shapeData).isRequired,
  value: PropTypes.any.isRequired
};

AreaPropertyPresenter.defaultProps = {
  stylization: ''
};

export default AreaPropertyPresenter;
