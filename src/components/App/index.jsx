import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { requestLoadAppData } from '../../store/loader/actions';

import Header from '../Header';
import Navigation from '../Navigation';
import Content from '../Content';

class App extends React.Component {
  componentDidMount() {
    this.props.onLoadAppData();
  }

  render() {
    return (
      <div className="map-application">
        <Header stylization="map-application-header map-application-fragment" />
        <Navigation stylization="map-application-nav map-application-fragment" />
        <Content stylization="map-application-content map-application-fragment" />
      </div>
    );
  }
}

App.propTypes = {
  onLoadAppData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onLoadAppData: () => dispatch(requestLoadAppData()),
});

export default connect(undefined, mapDispatchToProps)(App);
