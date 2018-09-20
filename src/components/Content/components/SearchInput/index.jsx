import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import SearchFilters from '../SearchFilters';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filtersVisibility: false,
    };

    this.onClickFiltersButton = this.onClickFiltersButton.bind(this);
  }

  onClickFiltersButton() {
    this.setState({
      filtersVisibility: !this.state.filtersVisibility,
    });
  }

  render() {
    const { stylization } = this.props;
    const { filtersVisibility } = this.state;

    const SearchButton = () => (
      <button className="search-input-button" />
    );

    const FiltersButton = () => (
      <button onClick={this.onClickFiltersButton} className="search-input-button" />
    );

    const searchFiltersStylization = classNames(
      'search-input-filters',
      { 'search-input-filters-none': !filtersVisibility },
    );
    return (
      <div className={classNames(stylization, 'search-input')}>
        <input className="search-input-string" placeholder="Поиск" type="text" />
        <SearchButton />
        <FiltersButton />
        <SearchFilters stylization={searchFiltersStylization} onClose={this.onClickFiltersButton} />
      </div>
    );
  }
}

SearchInput.propTypes = {
  stylization: PropTypes.string,
};

SearchInput.defaultProps = {
  stylization: '',
};

export default SearchInput;
