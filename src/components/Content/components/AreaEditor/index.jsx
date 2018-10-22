import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { loadStatusEnum, keys as loaderKeys } from '../../../../store/loader/constants';
import { keys as areaEditorKeys } from '../../../../store/areaEditor/constants';
import {
  updateAreaPropertyValue,
  closeAreaEditor,
  publishChangesCadastrialArea,
  removeCadastrialArea,
} from '../../../../store/areaEditor/actions';

import EditableAreaProperties from '../EditableAreaProperties';

const AreaEditor = ({
  stylization,
  propsDataLoadStatus,
  id,
  properties,
  onChangeProperty,
  onCloseEditor,
  onPublishArea,
  onRemoveArea,
}) => {
  const Header = () => <div className="area-editor-header">Редактирование выбранного участка</div>;

  const CloseButton = () => (
    <button className="area-editor-close-button" onClick={onCloseEditor}>
      <i className="fas fa-times" />
    </button>
  );

  const PostButton = () => (
    <button className="area-editor-control" onClick={() => onPublishArea(id)}>
      Опубликовать
    </button>
  );

  const SaveButton = () => (
    <button className="area-editor-control">
      Сохранить
    </button>
  );

  const RemoveButton = () => (
    <button className="area-editor-weak-control" onClick={() => onRemoveArea(id)}>
      Удалить
    </button>
  );

  const Controls = () => (
    <div className="area-editor-controls">
      <PostButton />
      <SaveButton />
      <RemoveButton />
    </div>
  );

  return (
    <div className={classNames('area-editor', stylization)}>
      <Header />
      <CloseButton />
      {propsDataLoadStatus === loadStatusEnum.success &&
        <EditableAreaProperties
          stylization="area-editor-props-list"
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

AreaEditor.propTypes = {
  stylization: PropTypes.string,
  propsDataLoadStatus: PropTypes.string.isRequired,
  id: PropTypes.number,
  properties: PropTypes.arrayOf(PropTypes.shape(shapeProperty)).isRequired,
  onChangeProperty: PropTypes.func.isRequired,
  onCloseEditor: PropTypes.func.isRequired,
  onPublishArea: PropTypes.func.isRequired,
  onRemoveArea: PropTypes.func.isRequired,
};

AreaEditor.defaultProps = {
  stylization: '',
  id: null,
};

const mapStateToProps = (state) => {
  const propsDataLoadStatus = state.loader.get(loaderKeys.areaPropertiesLoadStatus);
  const id = state.areaEditor.get(areaEditorKeys.id);
  const properties = state.areaEditor.get(areaEditorKeys.properties);
  const propsData = state.areaEditor.get(areaEditorKeys.propsData);
  const propsValue = state.areaEditor.get(areaEditorKeys.propsValue);
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
  onCloseEditor: () => dispatch(closeAreaEditor()),
  onPublishArea: area => dispatch(publishChangesCadastrialArea(area)),
  onRemoveArea: area => dispatch(removeCadastrialArea(area)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AreaEditor);
