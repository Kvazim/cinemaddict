import { FiltersType, UpdateType } from '../const';
import { RenderPosition, remove, render, replace } from '../framework/render';
import { filter } from '../utils/filter';
import FilterListView from '../view/filter-list-view';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filmsModel = null;
  #filterModel = null;

  constructor({filterContainer, filmsModel, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);

  }

  get filters() {
    const films = this.#filmsModel.films;

    return Object.values(FiltersType).map((type) => ({
      type,
      count: filter[type](films).length
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterListView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#filterTypeChangeHandler
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => this.init();

  #filterTypeChangeHandler = (filterType) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
