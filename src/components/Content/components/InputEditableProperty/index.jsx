import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const InputEditableProperty = ({
  stylization,
  value,
  data,
  onChange,
}) => {
  const Input = () => (
    <input
      className="input-editable-property-input"
      type="text"
      value={value}
      onChange={onChange}
    />
  );

  return (
    <div className={classNames(stylization, 'input-editable-property')}>
      {data.title}: <Input />
    </div>
  );
};

const shapeData = {
  title: PropTypes.string.isRequired,
};

InputEditableProperty.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeData).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

InputEditableProperty.defaultProps = {
  stylization: '',
  value: '',
  onChange: () => {},
};

export default InputEditableProperty;
