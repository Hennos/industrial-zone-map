import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { closeObjectDetails } from '../../../../store/objectDetails/actions';

const ObjectDetails = ({ stylization, onCloseObjectDetails }) => (
  <div className={classNames('object-details', stylization)}>
    <div className="object-details-header">
      <p className="object-details-header-content" />
      <button className="object-details-close" onClick={onCloseObjectDetails} />
    </div>
  </div>
);

ObjectDetails.propTypes = {
  stylization: PropTypes.string,
  onCloseObjectDetails: PropTypes.func.isRequired,
};

ObjectDetails.defaultProps = {
  stylization: '',
};

const mapDispatchToProps = dispatch => ({
  onCloseObjectDetails: () => dispatch(closeObjectDetails()),
});

export default connect(undefined, mapDispatchToProps)(ObjectDetails);
