import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const Sidebar = ({ stylization, children }) => (
  <div className={classNames(stylization, 'sidebar')}>
    {children}
  </div>
);

Sidebar.propTypes = {
  stylization: PropTypes.string,
  children: PropTypes.element.isRequired,
};

Sidebar.defaultProps = {
  stylization: '',
};

export default Sidebar;
