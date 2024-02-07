import AbstractView from '../framework/view/abstract-view';
import createSortListViewTemplate from './templates/create-sort-list-view-template';

export default class SortListView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();

    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortListClickHandler);
  }

  get template() {
    return createSortListViewTemplate(this.#currentSortType);
  }

  #sortListClickHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.getAttribute('href') !== null) {
      this.#handleSortTypeChange(evt.target.getAttribute('href').substring(1));
    }
  };
}

