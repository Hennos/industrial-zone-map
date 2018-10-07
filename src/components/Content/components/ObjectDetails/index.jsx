import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { keys } from '../../../../store/objectDetails/constants';
import {
  loadObjectDetailsData,
  closeObjectDetails,
} from '../../../../store/objectDetails/actions';

import PropertyPresenter from '../PropertyPresenter';

class ObjectDetails extends React.Component {
  componentDidMount() {
    this.props.onLoadProperties();
  }

  render() {
    const {
      stylization,
      loadStatus,
      properties,
      onCloseObjectDetails,
    } = this.props;

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
          {loadStatus === 'SUCCESS' &&
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
  }
}

const shapeProperty = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  value: PropTypes.any,
};

ObjectDetails.propTypes = {
  stylization: PropTypes.string,
  loadStatus: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape(shapeProperty)).isRequired,
  onLoadProperties: PropTypes.func.isRequired,
  onCloseObjectDetails: PropTypes.func.isRequired,
};

ObjectDetails.defaultProps = {
  stylization: '',
};

const mapStateToProps = (state) => {
  const loadStatus = state.objectDetails.get(keys.loadStatus);
  const properties = state.objectDetails.get(keys.properties);
  const propsData = state.objectDetails.get(keys.propsData);
  const propsValue = state.objectDetails.get(keys.propsValue);
  return {
    loadStatus,
    properties: properties.map(name => ({
      name,
      data: propsData.get(name),
      value: propsValue.get(name) || null,
    })).toArray(),
  };
};

const mapDispatchToProps = dispatch => ({
  onLoadProperties: () => dispatch(loadObjectDetailsData()),
  onCloseObjectDetails: () => dispatch(closeObjectDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetails);
