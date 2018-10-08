import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { keys as searchKeys } from '../../store/search/constants';
import { keys as legendKeys } from '../../store/legend/constants';

import Sidebar from './components/Sidebar';
import Map from './components/Map';
import EntityInformation from './components/EntityInformation';
import MapInformation from './components/MapInformation';
import SearchFilters from './components/SearchFilters';
import MapLegend from './components/MapLegend';

const Content = ({ stylization, filtersVisibility, legendVisability }) => (
  <div className={classNames(stylization, 'content')}>
    <Sidebar stylization="content-sidebar">
      <EntityInformation />
    </Sidebar>
    <div className="content-container">
      <Map />
    </div>
    <div className="content-footer">
      <MapInformation />
    </div>
    {filtersVisibility && <SearchFilters
      stylization="content-search-filters modal-window-theme"
    />}
    {legendVisability && <MapLegend
      stylization="content-map-legend modal-window-theme"
    />}
  </div>
);

Content.propTypes = {
  stylization: PropTypes.string,
  filtersVisibility: PropTypes.bool.isRequired,
  legendVisability: PropTypes.bool.isRequired,
};

Content.defaultProps = {
  stylization: '',
};

const mapStateTpProps = state => ({
  filtersVisibility: state.search.get(searchKeys.filtersVisability),
  legendVisability: state.legend.get(legendKeys.legendVisability),
});

export default connect(mapStateTpProps)(Content);
