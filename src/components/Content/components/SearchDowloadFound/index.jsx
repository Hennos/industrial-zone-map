import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const SearchDowloadFound = ({ stylization, found }) => (
  <a
    href={`http://industry.aonords.ru/map_interface.php?action=get_document&data=[${found}]`}
    className={classNames(stylization, 'search-dowload-found-control')}
  >
    Загрузить найденные <i className="fas fa-download" />
  </a>
);

SearchDowloadFound.propTypes = {
  stylization: PropTypes.string,
  found: PropTypes.arrayOf(PropTypes.number)
};

SearchDowloadFound.defaultProps = {
  stylization: '',
  found: []
};

export default SearchDowloadFound;
