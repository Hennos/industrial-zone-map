import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Header = ({ stylization }) => (
  <div className={classNames(stylization)} />
);

Header.propTypes = {
  stylization: PropTypes.string,
};

Header.defaultProps = {
  stylization: '',
};

export default Header;
