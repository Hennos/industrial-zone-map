import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import MapLegend from '../MapLegend';

class MapInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      legendVisibility: false,
    };

    this.onClickLegendButton = this.onClickLegendButton.bind(this);
  }

  onClickLegendButton() {
    this.setState({
      legendVisibility: !this.state.legendVisibility,
    });
  }

  render() {
    const { stylization } = this.props;
    const { legendVisibility } = this.state;

    const LegendButton = () => (
      <button onClick={this.onClickLegendButton} className="map-information-button" />
    );

    const mapLegendStylization = classNames(
      'map-information-legend',
      { 'map-information-legend-none': !legendVisibility },
    );
    return (
      <div className={classNames(stylization, 'map-information')}>
        <LegendButton stylization="map-information-button" />
        <MapLegend stylization={mapLegendStylization} onClose={this.onClickLegendButton} />
      </div>
    );
  }
}

MapInformation.propTypes = {
  stylization: PropTypes.string,
};

MapInformation.defaultProps = {
  stylization: '',
};

export default MapInformation;
