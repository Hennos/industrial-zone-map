import createPresenter from '../createPresenter';

import RangeFilter from '../RangeFilter';
import FlagFilter from '../FlagFilter';
import SelectFilter from '../SelectFilter';

const FilterPresenter = createPresenter({
  range: RangeFilter,
  check: FlagFilter,
  select: SelectFilter
});

export default FilterPresenter;
