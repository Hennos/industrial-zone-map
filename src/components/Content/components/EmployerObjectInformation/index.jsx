import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const EmployerObjectInformation = ({
  stylization,
  id,
  data,
  editable,
  onRequestDetails,
  onRequestEdit
}) => (
  <div className={classNames(stylization, 'employer-object-information')}>
    <p className="employer-object-information-header">{data.name}</p>
    <ul className="employer-object-information-list">
      <li className="list-element">
        Адрес:
        {data.address || '-'}
      </li>
      <li className="list-element">
        Телефон:
        {data.phone || '-'}
      </li>
      <li className="list-element">
        Факс:
        {data.fax || '-'}
      </li>
      <li className="list-element">
        E-mail:
        {data.email || '-'}
      </li>
      <li className="list-element">
        Официальный сайт:
        {data.url || '-'}
      </li>
      <li className="list-element">
        Генеральный директор:
        {data.director || '-'}
      </li>
      <li className="list-element list-element-operations">
        <button
          className="employer-object-information-operation"
          type="button"
          onClick={() => onRequestDetails(id)}
        >
          Подробнее
        </button>
        {editable && (
          <button
            className="employer-object-information-operation"
            type="button"
            onClick={() => onRequestEdit(id)}
          >
            Редактировать
          </button>
        )}
      </li>
    </ul>
  </div>
);

const shapeObjectData = {
  name: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  fax: PropTypes.string,
  email: PropTypes.string,
  url: PropTypes.string,
  director: PropTypes.string,
  created: PropTypes.bool
};

EmployerObjectInformation.propTypes = {
  stylization: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  data: PropTypes.shape(shapeObjectData).isRequired,
  editable: PropTypes.bool,
  onRequestDetails: PropTypes.func,
  onRequestEdit: PropTypes.func
};

EmployerObjectInformation.defaultProps = {
  stylization: '',
  editable: false,
  onRequestDetails: () => {},
  onRequestEdit: () => {}
};

export default EmployerObjectInformation;
