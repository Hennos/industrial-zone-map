import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { loadStatusEnum, keys as loaderKeys } from '../../../../store/loader/constants';
import { keys as legendKeys } from '../../../../store/legend/constants';
import { invertLegendVisability } from '../../../../store/legend/actions';

import LegendRecord from '../LegendRecord';

const MapLegend = ({
  stylization,
  loadStatus,
  records,
  onCloseLegend,
}) => {
  const Header = () => (
    <div className="map-legend-header">
      Обозначения на карте
    </div>
  );

  const CloseButton = () => (
    <button className="map-legend-close-button" onClick={onCloseLegend}>
      <i className="fas fa-times" />
    </button>
  );

  return (
    <div className={classNames(stylization, 'map-legend')}>
      <Header />
      <CloseButton />
      <div className="map-legend-list">
        {loadStatus === loadStatusEnum.success &&
          records.map(({ id, data }) => (
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
  loadStatus: PropTypes.string.isRequired,
  records: PropTypes.arrayOf(PropTypes.shape(shapeLegendRecords)).isRequired,
  onCloseLegend: PropTypes.func.isRequired,
};

MapLegend.defaultProps = {
  stylization: '',
};

const mapStateToProps = (state) => {
  const loadStatus = state.loader.get(loaderKeys.legendLoadStatus);
  const legendRecords = state.legend.get(legendKeys.legendRecords);
  const legendRecordsData = state.legend.get(legendKeys.legendRecordsData);
  return {
    loadStatus,
    records: legendRecords.map(id => ({
      id,
      data: legendRecordsData.get(id),
    })).toArray(),
  };
};

const mapdDspatchToProps = dispatch => ({
  onCloseLegend: () => dispatch(invertLegendVisability()),
});

export default connect(mapStateToProps, mapdDspatchToProps)(MapLegend);
