import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

class SelectDropList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropped: false,
    };

    this.onDropListButtonClick = this.onDropListButtonClick.bind(this);
    this.onChooseOption = this.onChooseOption.bind(this);
  }

  onDropListButtonClick() {
    this.setState({
      dropped: !this.state.dropped,
    });
  }

  onChooseOption(option) {
    this.props.onChange({
      choosed: this.props.choosed.find(value => value === option) ?
        this.props.choosed.filter(value => value !== option) :
        this.props.choosed.concat(option),
    });
  }

  render() {
    const {
      stylization,
      choosed,
      options,
    } = this.props;
    const { dropped } = this.state;
    const contentStylization = classNames(
      'select-drop-list-options',
      'modal-window-theme',
      { 'select-drop-list-options-none': !dropped },
    );
    return (
      <div className={classNames(stylization, 'select-drop-list')} >
        {choosed.length ?
          `несколько выбранных (${choosed.length})` :
          'выберите из списка'}
        <button className="select-drop-list-button" onClick={this.onDropListButtonClick} />
        <div className={contentStylization}>
          {options.map(option => (
            <div
              className={classNames('select-drop-list-option', {
                'select-drop-list-option-choosed': !!choosed.find(value => value === option),
              })}
              key={option}
              onClick={() => this.onChooseOption(option)}
            >
              <input
                type="checkbox"
                checked={!!choosed.find(value => value === option)}
              />
              {option}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

SelectDropList.propTypes = {
  stylization: PropTypes.string,
  choosed: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

SelectDropList.defaultProps = {
  stylization: '',
  choosed: [],
  options: [],
  onChange: () => {},
};

export default SelectDropList;
