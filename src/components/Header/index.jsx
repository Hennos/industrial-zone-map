import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const Header = ({ stylization }) => (
  <div className={classNames('header', stylization)}>
    <div className="header-container">
      <ul className="icons">
        <li className="icon">
          <i className="fab fa-facebook-f" />
        </li>
        <li className="icon">
          <i className="fab fa-twitter" />
        </li>
        <li className="icon">
          <i className="fab fa-google-plus-g" />
        </li>
        <li className="icon">
          <i className="fab fa-linkedin-in" />
        </li>
      </ul>
      <div className="contacts">
        <div className="contact">
          <div className="contact-icon">
            <i className="fas fa-phone" />
          </div>
          +011 54925849
        </div>
        <div className="contact">
          <div className="contact-icon">
            <i className="fas fa-envelope" />
          </div>
          contact@softech.com
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  stylization: PropTypes.string,
};

Header.defaultProps = {
  stylization: '',
};

export default Header;
