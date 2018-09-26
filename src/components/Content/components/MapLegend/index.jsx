import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { keys } from '../../../../store/legend/constants';

import LegendRecord from '../LegendRecord';

const MapLegend = ({ stylization, records, onClose }) => {
  const Header = () => (
    <div className="map-legend-header">
      Обозначения на карте
    </div>
  );

  const CloseButton = () => (
    <button className="map-legend-close-button" onClick={onClose} />
  );

  return (
    <div className={classNames(stylization, 'map-legend')}>
      <Header />
      <CloseButton />
      <div className="map-legend-list">
        {records.map(({ id, data }) => (
          <LegendRecord key={id} stylization="map-legend-list-element" data={data} />
        ))}
      </div>
    </div>
  );
};

const shapeLegendRecords = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
};

MapLegend.propTypes = {
  stylization: PropTypes.string,
  onClose: PropTypes.func,
  records: PropTypes.arrayOf(PropTypes.shape(shapeLegendRecords)).isRequired,
};

MapLegend.defaultProps = {
  stylization: '',
  onClose: () => {},
};

const mapStateToProps = (state) => {
  const legendRecords = state.legend.get(keys.legendRecords);
  const legendRecordsData = state.legend.get(keys.legendRecordsData);
  return {
    records: legendRecords.map(id => ({
      id,
      data: legendRecordsData.get(id),
    })).toArray(),
  };
};

export default connect(mapStateToProps)(MapLegend);
