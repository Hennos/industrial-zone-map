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
    this.props.onChange({
      lower: parseInt(event.target.value, 10),
      upper: this.props.value.upper || NaN,
    });
    event.preventDefault();
  }

  onUpperChange(event) {
    this.props.onChange({
      lower: this.props.value.lower || NaN,
      upper: parseInt(event.target.value, 10),
    });
    event.preventDefault();
  }

  render() {
    const { stylization } = this.props;
    const { lower, upper } = this.props.value;
    const { title, units } = this.props.data;

    return (
      <div className={classNames(stylization, 'range-filter')}>
        {title} ({units}) от
        <Range stylization="range-filter-input" value={lower ? lower.toString() : ''} onChange={this.onLowerChange} />
        до
        <Range stylization="range-filter-input" value={upper ? upper.toString() : ''} onChange={this.onUpperChange} />
      </div>
    );
  }
}

const shapeValue = {
  lower: PropTypes.number,
  upper: PropTypes.number,
};

const shapeElementData = {
  title: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
};

RangeFilter.propTypes = {
  stylization: PropTypes.string,
  value: PropTypes.shape(shapeValue).isRequired,
  data: PropTypes.shape(shapeElementData).isRequired,
  onChange: PropTypes.func,
};

RangeFilter.defaultProps = {
  stylization: '',
  onChange: () => {},
};

export default RangeFilter;
