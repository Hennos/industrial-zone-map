import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import { FeatureGroup, LayerGroup, Polygon, Marker, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { userGroupsEnum, keys as userStatusKeys } from '../../../../store/userStatus/constants';
import { loadStatusEnum, keys as mapLayerZoneKeys } from '../../../../store/mapLayerZone/constants';
import {
  createTerritoryCadastrialArea,
  editTerritoryCadastrialAreas
} from '../../../../store/mapLayerZone/actions';
import { loadObjectDetails } from '../../../../store/objectDetails/actions';
import { requestLoadAreaPropertiesValue } from '../../../../store/areaEditor/actions';
import { setCreatedArea } from '../../../../store/areaCreation/actions';

import withLoading from '../withLoading';
import ZonePolygon from '../ZonePolygon';
import AreaInformation from '../AreaInformation';
import EmployerObjectInformation from '../EmployerObjectInformation';

import { setLocalisationDraw } from './helpers';

import marker from './marker.svg';

class MapLayerZone extends React.Component {
  constructor(props) {
    super(props);

    this.onCreateArea = this.onCreateArea.bind(this);
    this.onEditAreas = this.onEditAreas.bind(this);
    this.onAddArea = this.onAddArea.bind(this);

    setLocalisationDraw(L.drawLocal);
  }

  onCreateArea({ layer }) {
    const { onCreateCadastrialArea } = this.props;
    const { geometry: area } = layer.toGeoJSON();
    onCreateCadastrialArea(area);
  }

  onEditAreas({ layers }) {
    const { onEditCadastrialAreas } = this.props;
    const edited = [];
    layers.eachLayer(layer => {
      const { geometry: area } = layer.toGeoJSON();
      edited.push({
        id: layer.options.id,
        bounds: area
      });
    });
    onEditCadastrialAreas(edited);
  }

  onAddArea({ layer }) {
    const { areas } = this.props;
    if (!areas.find(({ id }) => id === layer.options.id)) {
      layer.remove();
    }
  }

  render() {
    const {
      superuser,
      zone,
      highlighted,
      areas,
      onRequestAreaDetails,
      onRequestAreaEdit,
      onRequestCreatedAreaEdit
    } = this.props;

    const Areas = () =>
      areas
        .filter(({ geometry }) => geometry.type === 'Polygon')
        .map(({ id, data, geometry }) => (
          <Polygon
            key={id}
            id={id}
            color={id === highlighted ? 'blue' : 'red'}
            positions={L.GeoJSON.coordsToLatLngs(geometry.coordinates, 1)}
          >
            <Popup>
              <AreaInformation
                editable={superuser}
                data={data}
                onRequestDetails={() => onRequestAreaDetails(id)}
                onRequestEdit={() => onRequestAreaEdit(id)}
                onRequestEditCreated={() => onRequestCreatedAreaEdit(id)}
              />
            </Popup>
          </Polygon>
        ));

    const Objects = () =>
      areas
        .filter(({ geometry }) => geometry.type === 'Point')
        .map(({ id, data, geometry }) => (
          <Marker
            key={id}
            id={id}
            icon={L.icon({ iconUrl: marker })}
            position={L.GeoJSON.coordsToLatLng(geometry.coordinates, 1)}
          >
            <Popup>
              <EmployerObjectInformation
                data={data}
                onRequestDetails={() => onRequestAreaDetails(id)}
              />
            </Popup>
          </Marker>
        ));

    return (
      <LayerGroup>
        {zone && (
          <ZonePolygon
            fill={false}
            coordinates={L.GeoJSON.coordsToLatLngs(zone.geometry.coordinates, 1)}
          />
        )}
        <FeatureGroup onLayeradd={this.onAddArea}>
          <Areas />
          <Objects />
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

MapLayerZone.propTypes = {
  superuser: PropTypes.bool,
  zone: PropTypes.object.isRequired,
  areas: PropTypes.object.isRequired,
  highlighted: PropTypes.string,
  onRequestAreaDetails: PropTypes.func.isRequired,
  onRequestAreaEdit: PropTypes.func.isRequired,
  onRequestCreatedAreaEdit: PropTypes.func.isRequired,
  onCreateCadastrialArea: PropTypes.func.isRequired,
  onEditCadastrialAreas: PropTypes.func.isRequired
};

MapLayerZone.defaultProps = {
  superuser: false,
  highlighted: null
};

const mapStateToProps = state => {
  const loaded =
    state.mapLayerZone.get(mapLayerZoneKeys.areasLoadStatus) === loadStatusEnum.success;
  const userGroups = state.userStatus.get(userStatusKeys.groups);
  const zone = state.mapLayerZone.get(mapLayerZoneKeys.zone);
  const highlighted = state.mapLayerZone.get(mapLayerZoneKeys.highlighted);
  const areas = state.mapLayerZone.get(mapLayerZoneKeys.areas);
  const areasData = state.mapLayerZone.get(mapLayerZoneKeys.areasData);
  const areasGeoData = state.mapLayerZone.get(mapLayerZoneKeys.areasGeoData);
  return {
    loaded,
    superuser: userGroups.get(userGroupsEnum.operator) || userGroups.get(userGroupsEnum.admin),
    zone: zone && {
      id: zone.id,
      geometry: zone.geometry
    },
    highlighted,
    areas: areas.map(id => ({
      id,
      data: areasData.get(id),
      geometry: areasGeoData.get(id)
    }))
  };
};

const mapDispatchToProps = dispatch => ({
  onRequestAreaDetails: id => dispatch(loadObjectDetails(id)),
  onRequestAreaEdit: id => dispatch(requestLoadAreaPropertiesValue(id)),
  onRequestCreatedAreaEdit: id => dispatch(setCreatedArea(id)),
  onCreateCadastrialArea: area => dispatch(createTerritoryCadastrialArea(area)),
  onEditCadastrialAreas: areas => dispatch(editTerritoryCadastrialAreas(areas))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLoading(MapLayerZone));
