import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

class PhotosEditableProperty extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeFiles = this.onChangeFiles.bind(this);
  }

  onChangeFiles(event) {
    const { files } = event.target;
    const { onChange } = this.props;
    const filesData = new FormData();
    filesData.append('photo', files[0]);
    onChange(filesData);
  }

  render() {
    const { stylization, data } = this.props;
    return (
      <div className={classNames(stylization, 'photos-editable-property')}>
        <p className="property-title">{data.title}</p>
        <input type="file" accept="image/jpeg,image/png" multiple onChange={this.onChangeFiles} />
      </div>
    );
  }
}

const shapeElementData = {
  title: PropTypes.string.isRequired
};

PhotosEditableProperty.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
  onChange: PropTypes.func
};

PhotosEditableProperty.defaultProps = {
  stylization: '',
  onChange: () => {}
};

export default PhotosEditableProperty;
