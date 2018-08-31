import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import Sidebar from './components/Sidebar';
import MapContainer from './components/MapContainer';

const Content = ({ stylization }) => (
  <div className={classNames(stylization, 'content')}>
    <Sidebar stylization="content-sidebar" />
    <MapContainer stylization="content-map-container" />
  </div>
);

Content.propTypes = {
  stylization: PropTypes.string,
};

Content.defaultProps = {
  stylization: '',
};

export default Content;
