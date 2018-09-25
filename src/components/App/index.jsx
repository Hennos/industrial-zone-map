import React from 'react';

import './index.css';

import Header from '../Header';
import Navigation from '../Navigation';
import Content from '../Content';

const App = () => (
  <div className="map-application">
    <Header stylization="map-application-header map-application-fragment" />
    <Navigation stylization="map-application-nav map-application-fragment" />
    <Content stylization="map-application-content map-application-fragment" />
  </div>
);

export default App;
