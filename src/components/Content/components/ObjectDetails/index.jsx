import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { loadStatusEnum, keys as loaderKeys } from '../../../../store/loader/constants';
import { keys as objectDetailsKeys } from '../../../../store/objectDetails/constants';
import { closeObjectDetails } from '../../../../store/objectDetails/actions';

import PropertyPresenter from '../PropertyPresenter';

const ObjectDetails = ({
  stylization,
  propsLoadStatus,
  ready,
  properties,
  onCloseObjectDetails,
}) => {
  const Header = () => (
    <div className="object-details-header">
      <p className="object-details-header-content">Информация по выбранному участку</p>
      <button className="object-details-close" onClick={onCloseObjectDetails} />
    </div>
  );

  return (
    <div className={classNames('object-details', stylization)}>
      <Header />
      <div className="object-details-list">
        {propsLoadStatus === loadStatusEnum.success &&
          ready &&
            properties
              .filter(({ value }) => value !== null)
              .map(({ name, data, value }) => (
                <PropertyPresenter
                  key={name}
                  stylization="object-details-list-element"
                  name={name}
                  data={data}
                  value={value}
                />
        ))}
      </div>
    </div>
  );
};

const shapeProperty = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  value: PropTypes.any,
};

ObjectDetails.propTypes = {
  stylization: PropTypes.string,
  propsLoadStatus: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape(shapeProperty)).isRequired,
  onCloseObjectDetails: PropTypes.func.isRequired,
};

ObjectDetails.defaultProps = {
  stylization: '',
};

const mapStateToProps = (state) => {
  const propsLoadStatus = state.loader.get(loaderKeys.areaPropertiesLoadStatus);
  const ready = state.objectDetails.get(objectDetailsKeys.ready);
  const properties = state.objectDetails.get(objectDetailsKeys.properties);
  const propsData = state.objectDetails.get(objectDetailsKeys.propsData);
  const propsValue = state.objectDetails.get(objectDetailsKeys.propsValue);
  return {
    propsLoadStatus,
    ready,
    properties: properties.map(name => ({
      name,
      data: propsData.get(name),
      value: propsValue.get(name) || null,
    })).toArray(),
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseObjectDetails: () => dispatch(closeObjectDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetails);
