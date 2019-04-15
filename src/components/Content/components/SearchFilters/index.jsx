import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import { loadStatusEnum, keys as loaderKeys } from '../../../../store/loader/constants';
import { keys as searchKeys } from '../../../../store/search/constants';
import { updateSearchFilterValue, invertFiltersVisability } from '../../../../store/search/actions';

import FilterPresenter from '../FilterPresenter';

const SearchFilters = ({ stylization, loadStatus, filters, onCloseFilters, onChangeFilter }) => {
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
        {loadStatus === loadStatusEnum.success &&
          filters.map(({ name, type, ...filter }) => (
            <FilterPresenter
              key={name}
              presented={type}
              stylization="search-filters-list-element"
              {...filter}
              onChange={newValue => onChangeFilter(name, newValue)}
            />
          ))}
      </div>
    </div>
  );
};

const shapeFilter = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

SearchFilters.propTypes = {
  stylization: PropTypes.string,
  loadStatus: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape(shapeFilter)).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onCloseFilters: PropTypes.func.isRequired
};

SearchFilters.defaultProps = {
  stylization: ''
};

function mapStateToProps(state) {
  const loadStatus = state.loader.get(loaderKeys.filtersLoadStatus);
  const filters = state.search[searchKeys.filters];
  const filtersData = state.search[searchKeys.filtersData];
  const filtersValue = state.search[searchKeys.filtersValue];
  return {
    loadStatus,
    filters: filters.map(name => {
      const { type, ...filterData } = filtersData[name];
      const filterValue = filtersValue[name];
      return {
        name,
        type,
        data: filterData,
        ...(filterValue && { value: filterValue })
      };
    })
  };
}

const mapDispatchToProps = dispatch => ({
  onChangeFilter: (name, value) => {
    dispatch(updateSearchFilterValue(name, value));
  },
  onCloseFilters: () => {
    dispatch(invertFiltersVisability());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFilters);
