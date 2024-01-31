import { FILM_COUNT_PER_STEP } from '../const';
import { render } from '../framework/render';
import FilmsBoardView from '../view/films-board-view';
import FilmsSectionView from '../view/films-section-view';
import FilmsTitleView from '../view/films-title-view';
import SortListView from '../view/sort-list-view';
import FilmPresenter from './film-presenter';
import FilterPresenter from './filter-presenter';

export default class BoardPresenter {
  #boardContainer = null;
  #filterPresenter = null;
  #sortListView = null;
  #filmsBoardView = new FilmsBoardView();
  #filmsSectionView = new FilmsSectionView();
  #filmsTitleComponent = null;
  #renderedFilmsCount = FILM_COUNT_PER_STEP;
  #filmPresenters = new Map();

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

  #renderFilmsTitle() {
    this.#filmsTitleComponent = new FilmsTitleView();

    render(this.#filmsTitleComponent, this.#filmsSectionView.element);
  }

  #renderFilmCard() {
    const filmPresenter = new FilmPresenter({filmsListContainer: this.#filmsBoardView.element});
    filmPresenter.init();
    this.#filmPresenters.set(filmPresenter);
  }

  #renderFilms(films) {
    this.#renderFilmCard(films);
    // films.forEach((film) => this.#renderFilmCard(film));
  }

  #renderBoard() {
    this.#filterPresenter.init();
    this.#renderSort();
    render(this.#filmsBoardView, this.#boardContainer);
    render(this.#filmsSectionView, this.#filmsBoardView.element);
    render(this.#filmsSectionView, this.#filmsBoardView.element);
    this.#renderFilmsTitle();
    this.#renderFilms();
  }
}
