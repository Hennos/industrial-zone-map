import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const FoundElement = ({ stylization, data, onRequestDetails }) => (
  <div className={classNames(stylization, 'found-element')}>
    <ul className="found-element-list">
      <li className="list-element">
        Адрес: {data.address}
      </li>
      <li className="list-element">
        Кад. номер: {data.cadastrialNumber}
      </li>
      <li className="list-element">
        Вид разрешённого пользования: {data.typePermittedUse}
      </li>
      <li className="list-element">
        <button className="found-element-details" onClick={onRequestDetails}>
          Подробнее
        </button>
      </li>
    </ul>
  </div>
);

const shapeElementData = {
  address: PropTypes.string,
  cadastrialNumber: PropTypes.string.isRequired,
  typePermittedUse: PropTypes.string.isRequired,
};

FoundElement.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
  onRequestDetails: PropTypes.func,
};

FoundElement.defaultProps = {
  stylization: '',
  onRequestDetails: () => {},
};

export default FoundElement;
