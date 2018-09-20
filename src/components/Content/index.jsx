import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import Sidebar from './components/Sidebar';

import Map from './components/Map';
import Search from './components/Search';

const Content = ({ stylization }) => (
  <div className={classNames(stylization, 'content')}>
    <Sidebar stylization="content-sidebar">
      <Search stylization="content-search" />
    </Sidebar>
    <div className="content-container">
      <Map />
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
