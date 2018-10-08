import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { keys } from '../../../../store/search/constants';
import {
  updateSearchFilterValue,
  invertFiltersVisability,
} from '../../../../store/search/actions';

import FilterPresenter from '../FilterPresenter';


const SearchFilters = ({
  stylization,
  filters,
  onCloseFilters,
  onChangeFilter,
}) => {
  const Header = () => <div className="search-filters-header">Критерии поиска</div>;

  const CloseButton = () => (
    <button onClick={onCloseFilters} className="search-filters-close-button">
      <i className="fas fa-times" />
    </button>
  );

  return (
    <div className={classNames(stylization, 'search-filters')}>
      <Header />
      <CloseButton />
      <div className="search-filters-list">
        {filters.map(({ id, data, value }) => (
          <FilterPresenter
            key={id}
            stylization="search-filters-list-element"
            value={value}
            data={data}
            onChange={newValue => onChangeFilter(id, newValue)}
          />
        ))}
      </div>
    </div>
  );
};

const shapeFilter = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
};

SearchFilters.propTypes = {
  stylization: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.shape(shapeFilter)).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onCloseFilters: PropTypes.func.isRequired,
};

SearchFilters.defaultProps = {
  stylization: '',
};

function mapStateToProps(state) {
  const filters = state.search.get(keys.filters);
  const filtersData = state.search.get(keys.filtersData);
  const filtersValue = state.search.get(keys.filtersValue);
  return {
    filters: filters.map(id => ({
      id,
      data: filtersData.get(id),
      value: filtersValue.get(id) || {},
    })).toArray(),
  };
}

const mapDispatchToProps = dispatch => ({
  onChangeFilter: (id, value) => {
    dispatch(updateSearchFilterValue(id, value));
  },
  onCloseFilters: () => {
    dispatch(invertFiltersVisability());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);
