import { FiltersType } from '../../const';
import { capitalize } from '../../utils/common';

function createFilterItemCountTemplate(count) {
  return `<span class="main-navigation__item-count">${count}</span>`;
}

function createFilterItemTemplate(filter, currentFilter) {
  const {type, count} = filter;
  const isActive = type === currentFilter ? 'main-navigation__item--active' : '';
  const isAll = type === FiltersType.ALL ? `${FiltersType.ALL} movies` : type;

  return `<a href="#${type}" class="main-navigation__item ${isActive}">${capitalize(isAll)} ${type === FiltersType.ALL ? '' : createFilterItemCountTemplate(count)}</a>`;
}

export default function createFilterListTemplate(filters, currentFilter) {
  return (
    `<nav class="main-navigation">
      ${filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join('')}
    </nav>`
  );
}
