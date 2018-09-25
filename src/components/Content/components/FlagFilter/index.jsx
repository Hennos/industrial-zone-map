import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

class FlagFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choosed: '',
    };
  }

  render() {
    const { stylization, onChange } = this.props;
    const { title } = this.props.data;
    const { choosed } = this.state;

    const DropListButton = () => (
      <div className="flag-drop-list-button" />
    );

    return (
      <div className={classNames(stylization, 'flag-filter')}>
        {title}: {choosed || 'выберите из списка'} <DropListButton />
      </div>
    );
  }
}

const shapeElementData = {
  title: PropTypes.string,
  type: PropTypes.string,
};

FlagFilter.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
  onChange: PropTypes.func,
};

FlagFilter.defaultProps = {
  stylization: '',
  onChange: () => {},
};

export default FlagFilter;
