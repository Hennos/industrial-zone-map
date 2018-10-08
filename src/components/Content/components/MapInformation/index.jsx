import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { invertLegendVisability } from '../../../../store/legend/actions';

const MapInformation = ({ stylization, onChangeLegendVisability }) => {
  const LegendButton = () => (
    <button onClick={onChangeLegendVisability} className="map-information-button" />
  );

  return (
    <div className={classNames(stylization, 'map-information')}>
      <LegendButton stylization="map-information-button" />
    </div>
  );
};

MapInformation.propTypes = {
  stylization: PropTypes.string,
  onChangeLegendVisability: PropTypes.func.isRequired,
};

MapInformation.defaultProps = {
  stylization: '',
};

const mapDispatchToProps = dispatch => ({
  onChangeLegendVisability: () => dispatch(invertLegendVisability()),
});

export default connect(undefined, mapDispatchToProps)(MapInformation);
