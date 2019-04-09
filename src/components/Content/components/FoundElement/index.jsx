import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const FoundElement = ({
  stylization,
  editable,
  data,
  onRequestDetails,
  onRequestEdit,
  onRequestShow
}) => (
  <div className={classNames(stylization, 'found-element')}>
    <ul className="found-element-list">
      <li className="list-element">Адрес: {data.address || '-'}</li>
      <li className="list-element">Кад. номер: {data.cadastrialNumber || '-'}</li>
      <li className="list-element">Вид разрешённого пользования: {data.usage || '-'}</li>
      <li className="list-element list-element-operations">
        <button className="found-element-operation" type="button" onClick={onRequestDetails}>
          Подробнее
        </button>
        {editable && (
          <button className="found-element-operation" type="button" onClick={onRequestEdit}>
            Редактировать
          </button>
        )}
        {data.territory && (
          <button className="found-element-operation" type="button" onClick={onRequestShow}>
            Показать
          </button>
        )}
      </li>
    </ul>
  </div>
);

const shapeElementData = {
  address: PropTypes.string,
  territory: PropTypes.bool,
  cadastrialNumber: PropTypes.string,
  usage: PropTypes.string
};

FoundElement.propTypes = {
  stylization: PropTypes.string,
  editable: PropTypes.bool,
  data: PropTypes.shape(shapeElementData).isRequired,
  onRequestDetails: PropTypes.func,
  onRequestEdit: PropTypes.func,
  onRequestShow: PropTypes.func
};

FoundElement.defaultProps = {
  stylization: '',
  editable: false,
  onRequestDetails: () => {},
  onRequestEdit: () => {},
  onRequestShow: () => {}
};

export default FoundElement;
