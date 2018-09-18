import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import Search from '../Search';

const Sidebar = ({ stylization }) => (
  <div className={classNames(stylization, 'sidebar')}>
    <Search stylization="sidebar-fragment" />
  </div>
);

Sidebar.propTypes = {
  stylization: PropTypes.string,
};

Sidebar.defaultProps = {
  stylization: '',
};

export default Sidebar;
