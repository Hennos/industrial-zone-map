import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import Range from '../Range';

class RangeFilter extends React.Component {
  constructor(props) {
    super(props);

    this.onLowerChange = this.onLowerChange.bind(this);
    this.onUpperChange = this.onUpperChange.bind(this);
  }

  onLowerChange(event) {
    this.props.onChange([parseInt(event.target.value, 10), this.props.value[1]]);
    event.preventDefault();
  }

  onUpperChange(event) {
    this.props.onChange([this.props.value[0], parseInt(event.target.value, 10)]);
    event.preventDefault();
  }

  render() {
    const { stylization } = this.props;
    const [lower, upper] = this.props.value;
    const { title, units } = this.props.data;
    return (
      <div className={classNames(stylization, 'range-filter')}>
        {title} ({units}) от
        <Range
          stylization="range-filter-input"
          value={lower ? lower.toString() : ''}
          onChange={this.onLowerChange}
        />
        до
        <Range
          stylization="range-filter-input"
          value={upper ? upper.toString() : ''}
          onChange={this.onUpperChange}
        />
      </div>
    );
  }
}

const shapeElementData = {
  title: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired
};

RangeFilter.propTypes = {
  stylization: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.number),
  data: PropTypes.shape(shapeElementData).isRequired,
  onChange: PropTypes.func
};

RangeFilter.defaultProps = {
  stylization: '',
  value: [NaN, NaN],
  onChange: () => {}
};

export default RangeFilter;
