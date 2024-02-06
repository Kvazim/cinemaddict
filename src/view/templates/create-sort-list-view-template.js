import { SortType } from '../../const';

function createSortItemTemplate(type, currentSortType = '') {
  return `<li><a href="#${type}" class="sort__button ${currentSortType === type ? 'sort__button--active' : ''}">Sort by ${type}</a></li>`;
}

export default function createSortListViewTemplate(currentSortType) {
  return (
    `<ul class="sort">
      ${Object.values(SortType).map((type) => createSortItemTemplate(type, currentSortType)).join('')}
    </ul>`
  );
}
