import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import LegendRecord from '../LegendRecord';

const MapLegend = ({ stylization }) => {
  const records = [{
    id: 1,
    description: 'Зона среднеэтажной и многоэтажной жилой застройки с включением объектов общественно деловой застройки, а также объектов инженерной инфраструктуры, связанных с обслуживанием данной зоны',
  }, {
    id: 2,
    description: 'Запись в легенде карты',
  }, {
    id: 3,
    description: 'Зона среднеэтажной и многоэтажной жилой застройки с включением объектов общественно деловой застройки, а также объектов инженерной инфраструктуры, связанных с обслуживанием данной зоны',
  }, {
    id: 4,
    description: 'Запись в легенде карты',
  }];

  const Header = () => (
    <div className="map-legend-header">
      Обозначения на карте
    </div>
  );

  const CloseButton = () => (
    <div className="map-legend-close-button" />
  );

  const LegendList = () => (
    <div className="map-legend-list">
      {records.map(({ id, ...legend }) => (
        <LegendRecord key={id} stylization="map-legend-list-element" data={legend} />
      ))}
    </div>
  );

  return (
    <div className={classNames(stylization, 'map-legend')}>
      <Header />
      <CloseButton />
      <LegendList />
    </div>
  );
};

const shapeLegendRecords = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
};

MapLegend.propTypes = {
  stylization: PropTypes.string,
  records: PropTypes.arrayOf(PropTypes.shape(shapeLegendRecords)).isRequired,
};

MapLegend.defaultProps = {
  stylization: '',
};

export default MapLegend;
