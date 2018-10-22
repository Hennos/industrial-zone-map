import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { loadStatusEnum, keys as loaderKeys } from '../../../../store/loader/constants';
import { keys as areaCreationKeys } from '../../../../store/areaCreation/constants';
import {
  updateAreaPropertyValue,
  closeAreaCreation,
  publishCreatedCadastrialArea,
  removeCreatedCadastrialArea,
} from '../../../../store/areaCreation/actions';

import EditableAreaProperties from '../EditableAreaProperties';

const AreaCreation = ({
  stylization,
  propsDataLoadStatus,
  id,
  properties,
  onChangeProperty,
  onCloseCreation,
  onPublishArea,
  onRemoveArea,
}) => {
  const Header = () => <div className="area-creation-header">Создание нового участка</div>;

  const CloseButton = () => (
    <button className="area-creation-close-button" onClick={onCloseCreation}>
      <i className="fas fa-times" />
    </button>
  );

  const PostButton = () => (
    <button className="area-creation-control" onClick={() => onPublishArea(id)}>
      Опубликовать
    </button>
  );

  const SaveButton = () => (
    <button className="area-creation-control">
      Сохранить
    </button>
  );

  const RemoveButton = () => (
    <button className="area-creation-weak-control" onClick={() => onRemoveArea(id)}>
      Удалить
    </button>
  );

  const Controls = () => (
    <div className="area-creation-controls">
      <PostButton />
      <SaveButton />
      <RemoveButton />
    </div>
  );

  return (
    <div className={classNames('area-creation', stylization)}>
      <Header />
      <CloseButton />
      {propsDataLoadStatus === loadStatusEnum.success &&
        <EditableAreaProperties
          stylization="area-creation-props-list"
          properties={properties}
          onChangeProperty={onChangeProperty}
        />}
      <Controls />
    </div>
  );
};

const shapeProperty = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  value: PropTypes.any,
};

AreaCreation.propTypes = {
  stylization: PropTypes.string,
  propsDataLoadStatus: PropTypes.string.isRequired,
  id: PropTypes.string,
  properties: PropTypes.arrayOf(PropTypes.shape(shapeProperty)).isRequired,
  onChangeProperty: PropTypes.func.isRequired,
  onCloseCreation: PropTypes.func.isRequired,
  onPublishArea: PropTypes.func.isRequired,
  onRemoveArea: PropTypes.func.isRequired,
};

AreaCreation.defaultProps = {
  stylization: '',
  id: '',
};

const mapStateToProps = (state) => {
  const propsDataLoadStatus = state.loader.get(loaderKeys.areaPropertiesLoadStatus);
  const id = state.areaCreation.get(areaCreationKeys.id);
  const properties = state.areaCreation.get(areaCreationKeys.properties);
  const propsData = state.areaCreation.get(areaCreationKeys.propsData);
  const propsValue = state.areaCreation.get(areaCreationKeys.propsValue);
  return {
    propsDataLoadStatus,
    id,
    properties: properties.map(name => ({
      name,
      data: propsData.get(name),
      value: propsValue.get(name) || null,
    })).toArray(),
  };
};

const mapDispatchToProps = dispatch => ({
  onChangeProperty: (name, value) => dispatch(updateAreaPropertyValue(name, value)),
  onCloseCreation: () => dispatch(closeAreaCreation()),
  onPublishArea: area => dispatch(publishCreatedCadastrialArea(area)),
  onRemoveArea: area => dispatch(removeCreatedCadastrialArea(area)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AreaCreation);
