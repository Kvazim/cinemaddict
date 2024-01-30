import { render } from '../framework/render';
import FilmsBoardView from '../view/films-board-view';
import SortListView from '../view/sort-list-view';
import FilterPresenter from './filter-presenter';

export default class BoardPresenter {
  #boardContainer = null;
  #filterPresenter = null;
  #sortListView = null;
  #filmsBoardView = new FilmsBoardView();

  constructor({boardContainer}) {
    this.#boardContainer = boardContainer;

    this.#filterPresenter = new FilterPresenter({filterContainer: this.#boardContainer});
  }

  init() {
    this.#renderBoard();
  }

  #renderSort() {
    this.#sortListView = new SortListView();
    render(this.#sortListView, this.#boardContainer);
  }

  #renderBoard() {
    this.#filterPresenter.init();
    this.#renderSort();
    render(this.#filmsBoardView, this.#boardContainer);
  }
}
