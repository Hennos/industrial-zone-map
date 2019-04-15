import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { loadStatusEnum } from '../../../../store/loader/constants';

import AreaProperties from '../AreaProperties';
import EmployerProperties from '../EmployerProperties';

import { mapStateToProps, mapDispatchToProps } from './mapToProps';

const ObjectDetails = ({
  stylization,
  propsLoadStatus,
  ready,
  description,
  photos,
  areaProperties,
  employerProperties,
  onCloseObjectDetails
}) => {
  const Header = () => (
    <div className="object-details-header">
      <p className="object-details-header-content">Информация по выбранному объекту</p>
      <button className="object-details-close" type="button" onClick={onCloseObjectDetails} />
    </div>
  );

  const Description = () =>
    description && (
      <div className="object-details-content-description object-details-content-block">
        {description}
      </div>
    );

  const PhotosList = () =>
    photos && (
      <div className="object-details-content-photos object-details-content-block">
        {photos.map(photo => (
          <img
            key={photo}
            className="object-details-content-photos-element"
            src={`http://industry.aonords.ru/${photo}`}
            alt="Изображение объекта"
          />
        ))}
      </div>
    );

  return (
    propsLoadStatus === loadStatusEnum.success &&
    ready && (
      <div className={classNames('object-details', stylization)}>
        <Header />
        <div className="object-details-content">
          <Description />
          <EmployerProperties
            stylization="object-details-content-block"
            properties={employerProperties}
          />
          <AreaProperties stylization="object-details-content-block" properties={areaProperties} />
          <PhotosList />
        </div>
      </div>
    )
  );
};

const shapeProperty = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  value: PropTypes.any
};

ObjectDetails.propTypes = {
  stylization: PropTypes.string,
  propsLoadStatus: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  areaProperties: PropTypes.arrayOf(PropTypes.shape(shapeProperty)).isRequired,
  employerProperties: PropTypes.arrayOf(PropTypes.shape(shapeProperty)).isRequired,
  onCloseObjectDetails: PropTypes.func.isRequired
};

ObjectDetails.defaultProps = {
  stylization: '',
  description: null,
  photos: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectDetails);
