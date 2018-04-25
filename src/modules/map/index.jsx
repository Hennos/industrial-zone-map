import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { keys } from './constants';
import { requestToken } from './actions';

import Map from './components/Map';

class MapConnecter extends React.Component {
  componentDidMount() {
    this.getInitialData();
  }

  getInitialData() {
    this.props.getToken();
  }

  render() {
    const { className, token } = this.props;
    return (
      <div className={classNames(className, 'map')}>
        {token ? <Map token={token} /> : null}
      </div>
    );
  }
}

MapConnecter.propTypes = {
  className: PropTypes.string,
  token: PropTypes.string,
  getToken: PropTypes.func.isRequired,
};

MapConnecter.defaultProps = {
  className: '',
  token: '',
};

const mapStateProps = state => ({
  token: state.map.get(keys.token),
});

const mapDispatchActions = dispatch => ({
  getToken: () => {
    dispatch(requestToken());
  },
});

export default connect(mapStateProps, mapDispatchActions)(MapConnecter);
