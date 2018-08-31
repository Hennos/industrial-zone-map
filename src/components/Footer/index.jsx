import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Footer = ({ stylization }) => (
  <div className={classNames(stylization)} />
);

Footer.propTypes = {
  stylization: PropTypes.string,
};

Footer.defaultProps = {
  stylization: '',
};

export default Footer;
