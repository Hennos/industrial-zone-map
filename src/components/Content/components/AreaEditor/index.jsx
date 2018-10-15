import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { loadStatusEnum, keys } from '../../../../store/areaEditor/constants';
import {
  stopAreaEditing,
  removeCadastrialArea,
} from '../../../../store/areaEditor/actions';

import EditablePropertyPresenter from '../EditablePropertyPresenter';

class AreaEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changes: [],
    };
  }

  render() {
    const {
      stylization,
      loadStatus,
      id,
      properties,
      onStopEditing,
      onRemoveArea,
    } = this.props;
    const { changes } = this.state;

    const Header = () => <div className="area-editor-header">Редактирование выбранного участка</div>;

    const CloseButton = () => (
      <button onClick={onStopEditing} className="area-editor-close-button">
        <i className="fas fa-times" />
      </button>
    );

    const PostButton = () => (
      <button className="area-editor-control">
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
        {loadStatus === loadStatusEnum.success &&
          <React.Fragment>
            <Header />
            <CloseButton />
            <div className="area-editor-props-list">
              {properties
                .filter(({ data }) => data.type !== 'dates')
                .map(({ name, data, value }) => (
                  <EditablePropertyPresenter
                    key={name}
                    stylization="area-editor-props-list-element"
                    name={name}
                    data={data}
                    value={changes.find(val => val.name === name) || value}
                  />
              ))}
            </div>
            <Controls />
          </React.Fragment>}
      </div>
    );
  }
}

const shapeProperty = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  value: PropTypes.any,
};

AreaEditor.propTypes = {
  stylization: PropTypes.string,
  loadStatus: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape(shapeProperty)).isRequired,
  onStopEditing: PropTypes.func.isRequired,
  onRemoveArea: PropTypes.func.isRequired,
};

AreaEditor.defaultProps = {
  stylization: '',
};

const mapStateToProps = (state) => {
  const loadStatus = state.areaEditor.get(keys.loadPropsDataStatus);
  const id = state.areaEditor.get(keys.id);
  const properties = state.areaEditor.get(keys.properties);
  const propsData = state.areaEditor.get(keys.propsData);
  const propsValue = state.areaEditor.get(keys.propsValue);
  return {
    loadStatus,
    id,
    properties: properties.map(name => ({
      name,
      data: propsData.get(name),
      value: propsValue.get(name) || null,
    })).toArray(),
  };
};

const mapDispatchToProps = dispatch => ({
  onStopEditing: () => dispatch(stopAreaEditing()),
  onRemoveArea: area => dispatch(removeCadastrialArea(area)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AreaEditor);
