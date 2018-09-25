import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const Range = ({ stylization, value, onChange }) => (
  <input
    className={classNames(stylization, 'range-input')}
    type="text"
    value={value}
    onChange={onChange}
  />
);

Range.propTypes = {
  stylization: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Range.defaultProps = {
  stylization: '',
  value: '',
  onChange: () => {},
};

export default Range;
