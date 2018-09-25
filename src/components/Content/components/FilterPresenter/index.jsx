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
    flag: FlagFilter,
    select: SelectFilter,
  };
  const { type, ...filterData } = data;
  const RenderedFilter = mapFilter[type];
  return (
    <RenderedFilter
      stylization={stylization}
      data={filterData}
      value={value}
      onChange={onChange}
    />
  );
};

const shapeFilterData = {
  type: PropTypes.string,
};

const shapeFilterValue = {};

FilterPresenter.propTypes = {
  stylization: PropTypes.string,
  value: PropTypes.shape(shapeFilterValue).isRequired,
  data: PropTypes.shape(shapeFilterData).isRequired,
  onChange: PropTypes.func,
};

FilterPresenter.defaultProps = {
  stylization: '',
  onChange: () => {},
};

export default FilterPresenter;
