import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

class SelectFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choosed: [1, 2],
    };
  }

  render() {
    const { stylization } = this.props;
    const { title } = this.props.data;
    const { choosed } = this.state;

    const DropListButton = () => (
      <div className="select-drop-list-button" />
    );

    const description =
      choosed.length
        ? `несколько выбранных (${choosed.length})`
        : 'выберите из списка';

    return (
      <div className={classNames(stylization, 'select-filter')}>
        {title}: {description} <DropListButton />
      </div>
    );
  }
}

const shapeElementData = {
  title: PropTypes.string,
  type: PropTypes.string,
};

SelectFilter.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeElementData).isRequired,
};

SelectFilter.defaultProps = {
  stylization: '',
};

export default SelectFilter;
