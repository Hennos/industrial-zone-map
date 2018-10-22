import React from 'react';
import PropTypes from 'prop-types';

import RangeFilter from '../RangeFilter';
import FlagFilter from '../FlagFilter';
import SelectFilter from '../SelectFilter';

const FilterPresenter = ({
  stylization,
  data,
  value,
  onChange,
}) => {
  const mapFilter = {
    range: RangeFilter,
    check: FlagFilter,
    select: SelectFilter,
  };
  const { type, ...filterData } = data;
  const RenderedFilter = mapFilter[type];
  return value !== null ?
    <RenderedFilter
      stylization={stylization}
      data={filterData}
      value={value}
      onChange={onChange}
    />
    :
    <RenderedFilter
      stylization={stylization}
      data={filterData}
      onChange={onChange}
    />;
};

const shapeFilterData = {
  type: PropTypes.string.isRequired,
};

FilterPresenter.propTypes = {
  stylization: PropTypes.string,
  data: PropTypes.shape(shapeFilterData).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

FilterPresenter.defaultProps = {
  stylization: '',
  onChange: () => {},
};

export default FilterPresenter;
