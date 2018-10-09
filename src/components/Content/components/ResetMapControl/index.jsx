import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { MapControl } from 'react-leaflet';
import { connect } from 'react-redux';

import './index.css';

import { resetMap } from '../../../../store/mapData/actions';

class ResetMapControl extends MapControl {
  componentWillMount() {
    const resetControl = L.control({ position: 'topleft' });
    const jsx = (
      <div className="reset-map-control">
        <button className="reset-map-control-button" onClick={this.props.onResetMap}>
          <i className="fas fa-sync-alt" />
        </button>
      </div>
    );

    resetControl.onAdd = () => {
      const div = L.DomUtil.create('div', '');
      ReactDOM.render(jsx, div);
      return div;
    };

    this.leafletElement = resetControl;
  }
}

ResetMapControl.propTypes = {
  onResetMap: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onResetMap: () => dispatch(resetMap()),
});

export default connect(undefined, mapDispatchToProps)(ResetMapControl);
