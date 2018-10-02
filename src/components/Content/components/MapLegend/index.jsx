import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { keys } from '../../../../store/legend/constants';
import { loadLegendData } from '../../../../store/legend/actions';

import LegendRecord from '../LegendRecord';

class MapLegend extends React.Component {
  componentDidMount() {
    this.props.loadLegendData();
  }

  render() {
    const {
      stylization,
      loadStatus,
      records,
      onClose,
    } = this.props;

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
          {loadStatus === 'SUCCESSFULL' &&
            records.map(({ id, data }) => (
              <LegendRecord key={id} stylization="map-legend-list-element" data={data} />
            ))}
        </div>
      </div>
    );
  }
}

const shapeLegendRecords = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
};

MapLegend.propTypes = {
  stylization: PropTypes.string,
  loadStatus: PropTypes.string.isRequired,
  records: PropTypes.arrayOf(PropTypes.shape(shapeLegendRecords)).isRequired,
  onClose: PropTypes.func,
  loadLegendData: PropTypes.func.isRequired,
};

MapLegend.defaultProps = {
  stylization: '',
  onClose: () => {},
};

const mapStateToProps = (state) => {
  const loadStatus = state.legend.get(keys.loadStatus);
  const legendRecords = state.legend.get(keys.legendRecords);
  const legendRecordsData = state.legend.get(keys.legendRecordsData);
  return {
    loadStatus,
    records: legendRecords.map(id => ({
      id,
      data: legendRecordsData.get(id),
    })).toArray(),
  };
};

const mapdDspatchToProps = dispatch => ({
  loadLegendData: () => dispatch(loadLegendData()),
});

export default connect(mapStateToProps, mapdDspatchToProps)(MapLegend);
