import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import { FeatureGroup, LayerGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { userGroupsEnum, keys as userStatusKeys } from '../../../../store/userStatus/constants';
import { loadStatusEnum, keys as mapLayerZoneKeys } from '../../../../store/mapLayerZone/constants';
import {
  createTerritoryCadastrialArea,
  editTerritoryCadastrialAreas
} from '../../../../store/mapLayerZone/actions';

import withLoading from '../withLoading';
import ZonePolygon from '../ZonePolygon';

import { setLocalisationDraw } from './helpers';

class MapLayerZone extends React.Component {
  constructor(props) {
    super(props);

    this.onCreateArea = this.onCreateArea.bind(this);
    this.onEditAreas = this.onEditAreas.bind(this);
    this.onAddArea = this.onAddArea.bind(this);

    setLocalisationDraw(L.drawLocal);
  }

  onCreateArea({ layer }) {
    const { geometry: area } = layer.toGeoJSON();
    this.props.onCreateCadastrialArea(area);
  }

  onEditAreas({ layers }) {
    const edited = [];
    layers.eachLayer(layer => {
      const { geometry: area } = layer.toGeoJSON();
      edited.push({
        id: layer.options.id,
        bounds: area
      });
    });
    this.props.onEditCadastrialAreas(edited);
  }

  onAddArea({ layer }) {
    if (!this.props.areas.find(({ id }) => id === layer.options.id)) {
      layer.remove();
    }
  }

  render() {
    const { superuser, zone, areas } = this.props;

    const Areas = () =>
      areas.map(({ id, coordinates }) => (
        <Polygon key={id} id={id} color="red" positions={coordinates} />
      ));

    // <Popup>
    //   <AreaInformation
    //     editable={superuser}
    //     data={data}
    //     onRequestDetails={() => onRequestAreaDetails(id)}
    //     onRequestEdit={() => onRequestAreaEdit(id)}
    //     onRequestEditCreated={() => onRequestCreatedAreaEdit(id)}
    //   />
    // </Popup>

    return (
      <LayerGroup>
        {zone && <ZonePolygon fill={false} {...zone} />}
        <FeatureGroup onLayeradd={this.onAddArea}>
          <Areas />
          {superuser && (
            <EditControl
              position="topright"
              onCreated={this.onCreateArea}
              onEdited={this.onEditAreas}
              draw={{
                polygon: {
                  shapeOptions: {
                    color: 'red'
                  },
                  showArea: true
                },
                polyline: false,
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false
              }}
              edit={{
                remove: false
              }}
            />
          )}
        </FeatureGroup>
      </LayerGroup>
    );
  }
}

const areaShape = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.array).isRequired
};

MapLayerZone.propTypes = {
  loaded: PropTypes.bool.isRequired,
  superuser: PropTypes.bool.isRequired,
  zone: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]).isRequired,
  areas: PropTypes.oneOfType([PropTypes.array, PropTypes.arrayOf(PropTypes.shape(areaShape))])
    .isRequired,
  onCreateCadastrialArea: PropTypes.func.isRequired,
  onEditCadastrialAreas: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const loaded =
    state.mapLayerZone.get(mapLayerZoneKeys.areasLoadStatus) === loadStatusEnum.success;
  const userGroups = state.userStatus.get(userStatusKeys.groups);
  const zone = state.mapLayerZone.get(mapLayerZoneKeys.zone);
  const areas = state.mapLayerZone.get(mapLayerZoneKeys.areas);
  const areasGeoData = state.mapLayerZone.get(mapLayerZoneKeys.areasGeoData);
  return {
    loaded,
    superuser: userGroups.get(userGroupsEnum.operator) || userGroups.get(userGroupsEnum.admin),
    zone: zone && {
      id: zone.id,
      coordinates: L.GeoJSON.coordsToLatLngs(zone.geometry.coordinates, 1)
    },
    areas: areas.map(id => ({
      id,
      coordinates: L.GeoJSON.coordsToLatLngs(areasGeoData.get(id).coordinates, 1)
    }))
  };
};

const mapDispatchToProps = dispatch => ({
  onCreateCadastrialArea: area => dispatch(createTerritoryCadastrialArea(area)),
  onEditCadastrialAreas: areas => dispatch(editTerritoryCadastrialAreas(areas))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLoading(MapLayerZone));
