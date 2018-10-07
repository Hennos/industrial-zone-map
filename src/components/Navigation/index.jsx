import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const Navigation = ({ stylization }) => (
  <div className={classNames('navigation', stylization)}>
    <div className="navigation-container">
      <div className="navigation-title">
        <img src="http://industry.specom-vm.ru/bitrix/templates/industry_copy/assets/images/spb.gif" alt="" className="brand" />
        <p className="navigation-title-naming">
          <b>Комитет по промышленной политике и инновациям Санкт-Петербурга</b>
          <br />
          Дирекция по сопровождению промышленных проектов
        </p>
      </div>
      <ul className="navigation-list">
        <li className="navigation-list-element">ГЛАВНАЯ</li>
        <li className="navigation-list-element">О НАС</li>
        <li className="navigation-list-element">НОВОСТИ</li>
        <li className="navigation-list-element">КАРТА</li>
        <li className="navigation-list-element">КОНТАКТЫ</li>
        <li className="navigation-list-element">РЕГИСТРАЦИЯ</li>
        <li className="navigation-list-button">
          <button>ВХОД</button>
        </li>
      </ul>
    </div>
  </div>
);

Navigation.propTypes = {
  stylization: PropTypes.string,
};

Navigation.defaultProps = {
  stylization: '',
};

export default Navigation;
