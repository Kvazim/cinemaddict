import { RenderPosition, remove, render, replace } from '../framework/render';
import FilterListView from '../view/filter-view';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;

  constructor({filterContainer}) {
    this.#filterContainer = filterContainer;
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterListView();

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }
}
