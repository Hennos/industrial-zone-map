import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { keys } from '../../../../store/entityInformation/constants';

import Search from '../Search';
import ObjectDetails from '../ObjectDetails';
import ZoneDetails from '../ZoneDetails';

const EntityInformation = ({ stylization, activeBlock }) => {
  const objectDetailsBlockStylization = classNames(
    'entity-information-block',
    activeBlock === 'OBJECT_DETAILS' ?
      'entity-information-block-active' :
      'entity-information-block-inactive',
  );
  const zoneDetailsBlockStylization = classNames(
    'entity-information-block',
    activeBlock === 'ZONE_DETAILS' ?
      'entity-information-block-active' :
      'entity-information-block-inactive',
  );
  return (
    <div className={classNames(stylization, 'entity-information')}>
      <Search stylization="entity-information-block entity-information-search" />
      <ObjectDetails stylization={objectDetailsBlockStylization} />
      <ZoneDetails stylization={zoneDetailsBlockStylization} />
    </div>
  );
};

EntityInformation.propTypes = {
  stylization: PropTypes.string,
  activeBlock: PropTypes.string.isRequired,
};

EntityInformation.defaultProps = {
  stylization: '',
};

const mapStateToProps = state => ({
  activeBlock: state.entityInformation.get(keys.block),
});

export default connect(mapStateToProps)(EntityInformation);

