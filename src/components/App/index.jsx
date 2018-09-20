import React from 'react';

import './index.css';

import Header from '../Header';
import Content from '../Content';

const App = () => (
  <div className="map-application">
    <Header stylization="map-application-header map-application-fragment" />
    <Content stylization="map-application-content map-application-fragment" />
  </div>
);

export default App;
