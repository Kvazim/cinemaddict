import AbstractView from '../framework/view/abstract-view';
import createFilterListTemplate from './templates/create-filter-list-template';

export default class FilterListView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();

    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterListTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    // TODO достаточно ли такой проверки? Если мы находимся в фильтре фаворит и нажимаем удалить должна ли перерисовываться борда

    if (evt.target.tagName !== 'A' || evt.target.getAttribute('href') === null) {
      return;
    }

    this.#handleFilterTypeChange(evt.target.getAttribute('href').substring(1));

  };
}

