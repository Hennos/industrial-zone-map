import React from 'react';
import PropTypes from 'prop-types';

import { propsEnum } from '../../../../store/objectDetails/constants';

import BadgesObjectProperty from '../BadgesObjectProperty';
import AnyObjectProperty from '../AnyObjectProperty';

const PropertyPresenter = ({
  stylization,
  name,
  data,
  value,
}) => {
  switch (name) {
    case propsEnum.connectivityOptions:
      return (
        <BadgesObjectProperty
          stylization={stylization}
          data={data}
          value={value}
        />
      );
    default:
      return (
        <AnyObjectProperty
          stylization={stylization}
          data={data}
          value={value}
        />
      );
  }
};

const shapeData = {
  title: PropTypes.string.isRequired,
};

PropertyPresenter.propTypes = {
  stylization: PropTypes.string,
  name: PropTypes.string.isRequired,
  data: PropTypes.shape(shapeData).isRequired,
  value: PropTypes.any.isRequired,
};

PropertyPresenter.defaultProps = {
  stylization: '',
};

export default PropertyPresenter;
