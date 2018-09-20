import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import SearchInput from '../SearchInput';
import SearchFound from '../SearchFound';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      found: [{
        id: 1,
        address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
        cadastrialNumber: '78:07:0003005:245',
        typePermittedUse: 'торговый центр',
      }, {
        id: 2,
        address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
        cadastrialNumber: '78:07:0003005:245',
        typePermittedUse: 'торговый центр',
      }, {
        id: 3,
        address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
        cadastrialNumber: '78:07:0003005:245',
        typePermittedUse: 'торговый центр',
      }, {
        id: 4,
        address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
        cadastrialNumber: '78:07:0003005:245',
        typePermittedUse: 'торговый центр',
      }, {
        id: 5,
        address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
        cadastrialNumber: '78:07:0003005:245',
        typePermittedUse: 'торговый центр',
      }, {
        id: 6,
        address: 'г.Санкт-Петербург, Петропавловская крепость, дом 3, литера А',
        cadastrialNumber: '78:07:0003005:245',
        typePermittedUse: 'торговый центр',
      }],
    };
  }

  render() {
    const { found } = this.state;
    return (
      <div className={classNames(this.props.stylization, 'search')}>
        <SearchInput stylization="search-input-area" />
        {(found.length)
        ? <SearchFound stylization="search-found-area" found={found} />
        : null}
      </div>
    );
  }
}

Search.propTypes = {
  stylization: PropTypes.string,
};

Search.defaultProps = {
  stylization: '',
};

export default Search;
