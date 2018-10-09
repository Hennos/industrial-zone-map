import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import {
  Map as LeafletMap,
  TileLayer,
  LayerGroup,
  FeatureGroup,
  Polygon,
  ZoomControl,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import './index.css';

import {
  keys as userStatusKeys,
  userGroupsEnum,
} from '../../../../store/userStatus/constants';
import { keys as mapDataKeys } from '../../../../store/mapData/constants';
import {
  loadIndustrialZones,
  chooseIndustrialZone,
} from '../../../../store/mapData/actions';

import ResetMapControl from '../ResetMapControl';

function setLocalisationDraw() {
  L.drawLocal.draw.toolbar.actions = {
    title: 'Отменить добавление',
    text: 'Отменить',
  };
  L.drawLocal.draw.toolbar.finish = {
    title: 'Завершить добавление',
    text: 'Завершить',
  };
  L.drawLocal.draw.toolbar.undo = {
    title: 'Удалить последнюю установленную точку',
    text: 'Удалить последнюю точку',
  };
  L.drawLocal.draw.toolbar.buttons.polygon = 'Добавить новый кадастровый участок';
  L.drawLocal.draw.handlers.polygon.tooltip = {
    start: 'Для добавления границ нового участка кликните на карте',
    cont: 'Для продолжения добавления границ нового участка кликните на карте',
    end: 'Для завершения границ нового участка кликните на первую установленную точку',
  };
  L.drawLocal.edit.toolbar.actions.save = {
    title: 'Сохранить изменения границ участков',
    text: 'Сохранить',
  };
  L.drawLocal.edit.toolbar.actions.cancel = {
    title: 'Отменить изменения границ участков',
    text: 'Отменить',
  };
  L.drawLocal.edit.toolbar.buttons = {
    edit: 'Изменить границы участков',
    editDisabled: 'Нет участков на карте',
    remove: 'Удалить участок',
    removeDisabled: 'Нет участков на карте',
  };
  L.drawLocal.edit.handlers.edit.tooltip = {
    text: 'Удерживайте и перетащите точку на границах участка',
    subtext: 'Нажните "Отменить" для сброса изменений',
  };
  L.drawLocal.edit.handlers.remove.tooltip = {
    text: 'Кликните по области участка для его удаления',
  };
}

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.token = 'pk.eyJ1IjoiaGVubm9zIiwiYSI6ImNpeTV0dnQxdjAwMXozMm82OWg5Zmp0NHAifQ.suQs7bdNBxg5Q8_stqjOaA';
    this.center = [59.9342802, 30.12979159];
    this.zoom = 10;
  }

  componentDidMount() {
    this.props.onLoadIndustrialZones();

    setLocalisationDraw();
  }

  render() {
    const {
      superuser,
      activeZone,
      zonesLoadStatus,
      zones,
      onChooseIndustrialZone,
      areasLoadStatus,
      areas,
    } = this.props;

    const initialBounds = [
      [59.78848044, 29.58237652],
      [60.10758148, 29.57413677],
      [60.11556124, 30.62286516],
      [59.78570206, 30.63673171],
    ];

    const bounds = activeZone ?
      activeZone.geo.coordinates[0] :
      initialBounds;

    return (
      <LeafletMap
        key={activeZone ? activeZone.id : 'initial'}
        id="root-map"
        center={this.center}
        zoom={this.zoom}
        minZoom={this.zoom}
        bounds={bounds}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://api.tiles.mapbox.com/v4/{mapType}/{z}/{x}/{y}.png?access_token={token}"
          mapType="mapbox.streets"
          token={this.token}
        />
        <ResetMapControl />
        <ZoomControl position="bottomright" />
        {zonesLoadStatus === 'SUCCESS' &&
          <LayerGroup>
            {!activeZone ?
              <LayerGroup>
                {zones.map(({ id, geo }) => (
                  <Polygon
                    key={id}
                    color="purple"
                    positions={geo.coordinates[0]}
                    onDblclick={() => onChooseIndustrialZone(id)}
                  />
                ))}
              </LayerGroup>
            :
              <LayerGroup>
                <Polygon
                  color="purple"
                  fill={false}
                  positions={activeZone.geo.coordinates[0]}
                />
                <FeatureGroup>
                  {superuser && <EditControl
                    position="topright"
                    draw={{
                      polygon: {
                        allowIntersection: false,
                        shapeOptions: {
                          color: 'red',
                        },
                        showArea: true,
                      },
                      polyline: false,
                      rectangle: false,
                      circle: false,
                      circlemarker: false,
                      marker: false,
                    }}
                  />}
                  {areasLoadStatus === 'SUCCESS' && areas.map(({ id, geo }) => (
                    <Polygon
                      key={id}
                      color="red"
                      opacity={0.5}
                      positions={geo.coordinates[0]}
                    />
                  ))}
                </FeatureGroup>
              </LayerGroup>
            }
          </LayerGroup>}
      </LeafletMap>
    );
  }
}

const objectShape = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  geo: PropTypes.object.isRequired,
};

Map.propTypes = {
  superuser: PropTypes.bool,
  activeZone: PropTypes.shape(objectShape),
  zonesLoadStatus: PropTypes.string.isRequired,
  zones: PropTypes.arrayOf(PropTypes.shape(objectShape)).isRequired,
  areasLoadStatus: PropTypes.string.isRequired,
  areas: PropTypes.arrayOf(PropTypes.shape(objectShape)).isRequired,
  onLoadIndustrialZones: PropTypes.func.isRequired,
  onChooseIndustrialZone: PropTypes.func.isRequired,
};

Map.defaultProps = {
  activeZone: null,
  superuser: false,
};

const mapStateToProps = (state) => {
  const userGroups = state.userStatus.get(userStatusKeys.groups);
  const activeZone = state.mapData.get(mapDataKeys.activeZone);
  const zonesLoadStatus = state.mapData.get(mapDataKeys.zonesLoadStatus);
  const zones = state.mapData.get(mapDataKeys.zones);
  const zonesData = state.mapData.get(mapDataKeys.zonesData);
  const zonesGeoData = state.mapData.get(mapDataKeys.zonesGeoData);
  const areasLoadStatus = state.mapData.get(mapDataKeys.areasLoadStatus);
  const areas = state.mapData.get(mapDataKeys.areas);
  const areasData = state.mapData.get(mapDataKeys.areasData);
  const areasGeoData = state.mapData.get(mapDataKeys.areasGeoData);
  return {
    superuser: userGroups.get(userGroupsEnum.operator) || userGroups.get(userGroupsEnum.admin),
    activeZone: activeZone ? ({
      id: activeZone,
      data: zonesData.get(activeZone),
      geo: zonesGeoData.get(activeZone),
    }) : null,
    zonesLoadStatus,
    areasLoadStatus,
    zones: zones.map(id => ({
      id,
      data: zonesData.get(id),
      geo: zonesGeoData.get(id),
    })).toArray(),
    areas: !areas.size ? [] :
      areas.map(id => ({
        id,
        data: areasData.get(id),
        geo: areasGeoData.get(id),
      })).toArray(),
  };
};

const mapDispatchToProps = dispatch => ({
  onLoadIndustrialZones: () => dispatch(loadIndustrialZones()),
  onChooseIndustrialZone: zone => dispatch(chooseIndustrialZone(zone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
