import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';

import {
  requestSearchObjects,
  invertFiltersVisability,
} from '../../../../store/search/actions';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onEnterInput = this.onEnterInput.bind(this);
  }

  onChangeInput(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  onEnterInput(event) {
    if (event.key === 'Enter') {
      this.props.onSearchObjects(this.state.inputValue);
    }
  }

  render() {
    const { stylization, onSearchObjects, onChangeFiltersVisability } = this.props;
    const { inputValue } = this.state;

    const SearchButton = () => (
      <button
        className="search-input-button"
        onClick={() => onSearchObjects(inputValue)}
      >
        <i className="fas fa-search" />
      </button>
    );

    const FiltersButton = () => (
      <button className="search-input-button" onClick={onChangeFiltersVisability}>
        <i className="fas fa-plus" />
      </button>
    );

    return (
      <div className={classNames(stylization, 'search-input')}>
        <input
          className="search-input-string"
          placeholder="Поиск"
          value={inputValue}
          type="text"
          onKeyPress={this.onEnterInput}
          onChange={this.onChangeInput}
        />
        <SearchButton />
        <FiltersButton />
      </div>
    );
  }
}

SearchInput.propTypes = {
  stylization: PropTypes.string,
  onSearchObjects: PropTypes.func.isRequired,
  onChangeFiltersVisability: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  stylization: '',
};

const mapDispatchToProps = dispatch => ({
  onSearchObjects: search => dispatch(requestSearchObjects(search)),
  onChangeFiltersVisability: () => dispatch(invertFiltersVisability()),
});

export default connect(undefined, mapDispatchToProps)(SearchInput);
