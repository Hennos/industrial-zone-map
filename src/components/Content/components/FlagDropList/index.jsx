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
    this.props.onChange((option !== this.props.choosed) ? option : null);
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
    );
    const choosedState = (() => {
      let stateString = '';
      if (!choosed) {
        stateString = 'выберите из списка';
      } else {
        stateString = options.find(({ name }) => name === choosed).title;
      }
      return stateString;
    })();
    return (
      <div className={classNames(stylization, 'flag-drop-list')} >
        {choosedState}
        <button className="flag-drop-list-button" onClick={this.onDropListButtonClick} />
        {dropped &&
          <div className={contentStylization}>
            {options.map(({ name, title }) => {
              const checked = name === choosed;
              const className = classNames(
                'flag-drop-list-option',
                { 'flag-drop-list-option-choosed': checked },
              );
              return (
                <button className={className} key={name} onClick={() => this.onChooseOption(name)}>
                  <input type="radio" checked={checked} />
                  <span>{title}</span>
                </button>
              );
            })}
          </div>}
      </div>
    );
  }
}

const shapeOption = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

FlagDropList.propTypes = {
  stylization: PropTypes.string,
  choosed: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape(shapeOption)),
  onChange: PropTypes.func,
};

FlagDropList.defaultProps = {
  choosed: null,
  stylization: '',
  options: [],
  onChange: () => {},
};

export default FlagDropList;
