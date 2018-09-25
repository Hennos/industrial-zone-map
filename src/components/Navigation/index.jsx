import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Navigation = ({ stylization }) => (
  <div className={classNames(stylization)} />
);

Navigation.propTypes = {
  stylization: PropTypes.string,
};

Navigation.defaultProps = {
  stylization: '',
};

export default Navigation;
