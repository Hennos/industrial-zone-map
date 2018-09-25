import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const FoundElement = ({ stylization, id, data }) => (
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
      <li className="list-element list-element-a">
        Подробнее
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
  id: PropTypes.number.isRequired,
  data: PropTypes.shape(shapeElementData).isRequired,
};

FoundElement.defaultProps = {
  stylization: '',
};

export default FoundElement;
