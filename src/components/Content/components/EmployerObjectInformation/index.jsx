import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const EmployerObjectInformation = ({ stylization, data, onRequestDetails }) => (
  <div className={classNames(stylization, 'employer-object-information')}>
    <p className="employer-object-information-header">{data.name}</p>
    <ul className="employer-object-information-list">
      <li className="list-element">Адрес: {data.address || '-'}</li>
      <li className="list-element">Телефон: {data.phone || '-'}</li>
      <li className="list-element">Факс: {data.fax || '-'}</li>
      <li className="list-element">E-mail: {data.email || '-'}</li>
      <li className="list-element">Официальный сайт: {data.url || '-'}</li>
      <li className="list-element">Генеральный директор: {data.director || '-'}</li>
      <li className="list-element list-element-operations">
        <button
          className="employer-object-information-operation"
          type="button"
          onClick={onRequestDetails}
        >
          Подробнее
        </button>
      </li>
    </ul>
  </div>
);

const shapeObjectData = {};

EmployerObjectInformation.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeObjectData).isRequired,
  onRequestDetails: PropTypes.func
};

EmployerObjectInformation.defaultProps = {
  stylization: '',
  onRequestDetails: () => {}
};

export default EmployerObjectInformation;
