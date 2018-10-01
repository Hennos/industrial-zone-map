import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import SearchFilters from '../SearchFilters';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      filtersVisibility: false,
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onClickFiltersButton = this.onClickFiltersButton.bind(this);
  }

  onChangeInput(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  onClickFiltersButton() {
    this.setState({
      filtersVisibility: !this.state.filtersVisibility,
    });
  }

  render() {
    const { stylization } = this.props;
    const { inputValue, filtersValue, filtersVisibility } = this.state;

    const SearchButton = () => (
      <button className="search-input-button" />
    );

    const FiltersButton = () => (
      <button onClick={this.onClickFiltersButton} className="search-input-button" />
    );

    const searchFiltersStylization = classNames(
      'search-input-filters',
      'modal-window-theme',
    );
    return (
      <div className={classNames(stylization, 'search-input')}>
        <input
          className="search-input-string"
          placeholder="Поиск"
          value={inputValue}
          type="text"
          onChange={this.onChangeInput}
        />
        <SearchButton />
        <FiltersButton />
        {filtersVisibility && <SearchFilters
          stylization={searchFiltersStylization}
          values={filtersValue}
          onClose={this.onClickFiltersButton}
        />}
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
