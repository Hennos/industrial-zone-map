import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const Sidebar = ({ stylization }) => (
  <div className={classNames(stylization)} />
);

Sidebar.propTypes = {
  stylization: PropTypes.string,
};

Sidebar.defaultProps = {
  stylization: '',
};

export default Sidebar;
