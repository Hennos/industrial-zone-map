import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import Sidebar from './components/Sidebar';

import Map from './components/Map';
import EntityInformation from './components/EntityInformation';
import MapInformation from './components/MapInformation';

const Content = ({ stylization }) => (
  <div className={classNames(stylization, 'content')}>
    <Sidebar stylization="content-sidebar">
      <EntityInformation />
    </Sidebar>
    <div className="content-container">
      <Map />
    </div>
    <div className="content-footer">
      <MapInformation />
    </div>
  </div>
);

Content.propTypes = {
  stylization: PropTypes.string,
};

Content.defaultProps = {
  stylization: '',
};

export default Content;
