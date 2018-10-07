import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

const BadgesObjectProperty = ({ stylization, value }) => (
  <div className={classNames('badges-object-property', stylization)}>
    {value.map(badge => (
      <div key={badge.option} className="badges-object-property-badge">
        {badge.title}
      </div>
    ))}
  </div>
);

const shapeValue = {
  option: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

BadgesObjectProperty.propTypes = {
  stylization: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.shape(shapeValue)).isRequired,
};

BadgesObjectProperty.defaultProps = {
  stylization: '',
};

export default BadgesObjectProperty;
