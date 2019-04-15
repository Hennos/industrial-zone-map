import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import { FeatureGroup, LayerGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import withLoading from '../withLoading';
import ZonePolygon from '../ZonePolygon';
import AreaSector from '../AreaSector';
import AreaObject from '../AreaObject';

import { setLocalisationDraw } from './helpers';

import { mapStateToProps, mapDispatchToProps } from './mapToProps';

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
    const { sectors } = this.props;
    if (!sectors.includes(layer.options.id)) {
      layer.remove();
    }
  }

  render() {
    const { superuser, zone, sectors, objects } = this.props;

    const Sectors = () => sectors.map(id => <AreaSector key={id} id={id} />);

    const Objects = () => objects.map(id => <AreaObject key={id} id={id} />);

    return (
      <LayerGroup>
        {zone && (
          <ZonePolygon
            fill={false}
            coordinates={L.GeoJSON.coordsToLatLngs(zone.geometry.coordinates, 1)}
          />
        )}
        <FeatureGroup onLayeradd={this.onAddArea}>
          <Sectors />
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

const shapeZone = {
  id: PropTypes.number.isRequired,
  geometry: PropTypes.object.isRequired
};

MapLayerZone.propTypes = {
  superuser: PropTypes.bool,
  zone: PropTypes.shape(shapeZone).isRequired,
  sectors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  objects: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  onCreateCadastrialArea: PropTypes.func.isRequired,
  onEditCadastrialAreas: PropTypes.func.isRequired
};

MapLayerZone.defaultProps = {
  superuser: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLoading(MapLayerZone));
