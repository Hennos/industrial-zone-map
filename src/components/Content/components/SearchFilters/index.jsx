import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.css';

import RangeFilter from '../RangeFilter';
import FlagFilter from '../FlagFilter';
import SelectFilter from '../SelectFilter';

class SearchFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [{
        id: 1,
        title: 'Приоритетный район',
        type: 'select',
      }, {
        id: 2,
        title: 'Площадь земельного участка',
        type: 'range',
        units: 'м²',
      }, {
        id: 3,
        title: 'Вид разрешенного использования',
        type: 'flag',
      }, {
        id: 4,
        title: 'Класс опасности производства',
        type: 'flag',
      }, {
        id: 5,
        title: 'Санитарно-защитная зона',
        type: 'flag',
      }, {
        id: 6,
        title: 'Газоснабжение',
        type: 'range',
        units: 'м³/сутки',
      }, {
        id: 7,
        title: 'Водоснабжение',
        type: 'range',
        units: 'м³/сутки',
      }, {
        id: 8,
        title: 'Водоотведение',
        type: 'range',
        units: 'м³/сутки',
      }, {
        id: 9,
        title: 'Теплоснабжение',
        type: 'range',
        units: 'Гкал/час',
      }, {
        id: 10,
        title: 'Электроснабжение',
        type: 'range',
        units: 'кВТ',
      }],
    };
  }

  render() {
    const { stylization } = this.props;
    const { filters } = this.state;

    const Header = () => (
      <div className="search-filters-header">
        Критерии поиска
      </div>
    );

    const CloseButton = () => (
      <div className="search-filters-close-button" />
    );

    const FilterRenderer = ({ type, data }) => {
      switch (type) {
        case 'range':
          return <RangeFilter stylization="search-filters-list-element" data={data} />;
        case 'flag':
          return <FlagFilter stylization="search-filters-list-element" data={data} />;
        case 'select':
          return <SelectFilter stylization="search-filters-list-element" data={data} />;
        default:
          return (
            <div className="search-filters-list-element" />
          );
      }
    };

    const FiltersList = () => (
      <div className="search-filters-list">
        {filters.map(({ id, type, ...data }) => (
          <FilterRenderer key={id} type={type} data={data} />
        ))}
      </div>
    );

    return (
      <div className={classNames(stylization, 'search-filters')}>
        <Header />
        <CloseButton />
        <FiltersList />
      </div>
    );
  }
}

SearchFilters.propTypes = {
  stylization: PropTypes.string,
};

SearchFilters.defaultProps = {
  stylization: '',
};

export default SearchFilters;
