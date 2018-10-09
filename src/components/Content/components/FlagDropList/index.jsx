import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

class FlagDropList extends React.Component {
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
      choosed: (option !== this.props.choosed) ? option : '',
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
      'flag-drop-list-options',
      'modal-window-theme',
      { 'flag-drop-list-options-none': !dropped },
    );
    return (
      <div className={classNames(stylization, 'flag-drop-list')} >
        {choosed || 'выберите из списка'}
        <button className="flag-drop-list-button" onClick={this.onDropListButtonClick} />
        <div className={contentStylization}>
          {options.map(option => (
            <div
              className={classNames('flag-drop-list-option', {
                'flag-drop-list-option-choosed': option === choosed,
              })}
              key={option}
              onClick={() => this.onChooseOption(option)}
            >
              <input
                type="radio"
                checked={option === choosed}
              />
              <span>{option}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

FlagDropList.propTypes = {
  stylization: PropTypes.string,
  choosed: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

FlagDropList.defaultProps = {
  choosed: '',
  stylization: '',
  options: [],
  onChange: () => {},
};

export default FlagDropList;
