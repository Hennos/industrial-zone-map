import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const AreaInformation = ({
  stylization,
  editable,
  data,
  onRequestDetails,
  onRequestEdit,
  onRequestEditCreated,
}) => (
  <div className={classNames(stylization, 'area-information')}>
    <ul className="area-information-list">
      <li className="list-element">
        Адрес: {data.address || '-'}
      </li>
      <li className="list-element">
        Кад. номер: {data.cadastrialNumber || '-'}
      </li>
      <li className="list-element">
        Вид разрешённого пользования: {data.usage || '-'}
      </li>
      <li className="list-element list-element-operations">
        {!data.created ?
          <React.Fragment>
            <button className="area-information-operation" onClick={onRequestDetails}>
              Подробнее
            </button>
            {editable && (
              <button className="area-information-operation" onClick={onRequestEdit}>
                Редактировать
              </button>)}
          </React.Fragment> :
          <button className="area-information-operation" onClick={onRequestEditCreated}>
            Редактировать
          </button>}
      </li>
    </ul>
  </div>
);

const shapeElementData = {
  address: PropTypes.string,
  cadastrialNumber: PropTypes.string,
  usage: PropTypes.arrayOf(PropTypes.string),
  created: PropTypes.bool,
};

AreaInformation.propTypes = {
  stylization: PropTypes.string,
  editable: PropTypes.bool,
  data: PropTypes.shape(shapeElementData).isRequired,
  onRequestDetails: PropTypes.func,
  onRequestEdit: PropTypes.func,
  onRequestEditCreated: PropTypes.func,
};

AreaInformation.defaultProps = {
  stylization: '',
  editable: false,
  onRequestDetails: () => {},
  onRequestEdit: () => {},
  onRequestEditCreated: () => {},
};

export default AreaInformation;
