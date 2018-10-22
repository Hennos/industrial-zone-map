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
    this.onDropListOut = this.onDropListOut.bind(this);
  }

  onDropListButtonClick() {
    this.setState({
      dropped: !this.state.dropped,
    });
  }

  onChooseOption(option) {
    this.props.onChange(this.props.choosed.find(value => value === option) ?
      this.props.choosed.filter(value => value !== option) :
      this.props.choosed.concat(option));
  }

  onDropListOut() {
    this.setState({
      dropped: false,
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
    );
    const choosedState = (() => {
      let stateString = '';
      if (!choosed.length) {
        stateString = 'выберите из списка';
      } else if (choosed.length === 1) {
        const onlyChoosed = options.find(({ name }) => name === choosed[0]).title;
        stateString = onlyChoosed;
      } else {
        stateString = `несколько выбранных (${choosed.length})`;
      }
      return stateString;
    })();
    return (
      <div className={classNames(stylization, 'select-drop-list')} >
        {choosedState}
        <button className="select-drop-list-button" onClick={this.onDropListButtonClick} />
        {dropped &&
          <div className={contentStylization}>
            {options.map(({ name, title }) => {
              const checked = !!choosed.find(value => value === name);
              const className = classNames(
                'select-drop-list-option',
                { 'select-drop-list-option-choosed': checked },
              );
              return (
                <button key={name} className={className} onClick={() => this.onChooseOption(name)}>
                  <input type="checkbox" checked={checked} />
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

SelectDropList.propTypes = {
  stylization: PropTypes.string,
  choosed: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.shape(shapeOption)),
  onChange: PropTypes.func,
};

SelectDropList.defaultProps = {
  stylization: '',
  choosed: [],
  options: [],
  onChange: () => {},
};

export default SelectDropList;
