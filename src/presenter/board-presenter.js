import { FILM_COUNT_PER_STEP, UserAction } from '../const';
import { UpdateType, TimeLimit } from '../const';
import { render, remove } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import FilmsBoardView from '../view/films-board-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsSectionView from '../view/films-section-view';
import FilmsTitleView from '../view/films-title-view';
import SortListView from '../view/sort-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmPresenter from './film-presenter';
import FilterPresenter from './filter-presenter';

export default class BoardPresenter {
  #boardContainer = null;
  #filterPresenter = null;
  #sortListView = null;
  #filmsModel = null;
  #filmsTitleComponent = null;
  #filmsBoardView = new FilmsBoardView();
  #filmsSectionView = new FilmsSectionView();
  #filmsListContainerView = new FilmsListContainerView();
  #showMoreButtonComponent = null;
  #renderedFilmsCount = FILM_COUNT_PER_STEP;
  #filmPresenters = new Map();
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({boardContainer, filmsModel}) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;

    this.#filterPresenter = new FilterPresenter({filterContainer: this.#boardContainer});

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenters.get(data.id).init(data);
        break;
      // case UpdateType.MINOR:
      //   this.#clearBoard();
      //   this.#renderBoard();
      //   break;
      // case UpdateType.MAJOR:
      //   this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
      //   this.#renderBoard();
      //   break;
      case UpdateType.INIT:
        // remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleActionView = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_FILM:
        // this.#filmPresenters.get(update.id).setSaving();
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch (error) {
          this.#filmPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  // #handleModeChange = () => {
  //   // this.#newPointPresenter.destroy();
  //   // this.#pointPresenters.forEach((pointPresenter) => pointPresenter.resetView());
  //   this.#filmPresenters.forEach((filmPresenter) => filmPresenter.resetView());
  // };

  get films() {
    // const films = this.#filmsModel.films;
    return this.#filmsModel.films;
  }

  #handleShowMoreButtonClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount + FILM_COUNT_PER_STEP);
    const tasks = this.films.slice(this.#renderedFilmsCount, newRenderedFilmsCount);

    this.#renderFilms(tasks);
    this.#renderedFilmsCount = newRenderedFilmsCount;

    if (this.#renderedFilmsCount >= filmsCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderSort() {
    this.#sortListView = new SortListView();
    render(this.#sortListView, this.#boardContainer);
  }

  #renderFilmsTitle() {
    this.#filmsTitleComponent = new FilmsTitleView();

    render(this.#filmsTitleComponent, this.#filmsSectionView.element);
  }

  #renderFilmCard(film) {
    const filmPresenter = new FilmPresenter({
      filmsListContainer: this.#filmsListContainerView.element,
      onDataChange: this.#handleActionView,
      // onModeChange: this.#handleModeChange,
    });

    filmPresenter.init(film);
    this.#filmPresenters.set(film.id, filmPresenter);
  }

  #renderFilms(films) {
    films.forEach((film) => this.#renderFilmCard(film));
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({onClick: this.#handleShowMoreButtonClick});
    render(this.#showMoreButtonComponent, this.#filmsSectionView.element);
  }

  #renderBoard() {
    this.#filterPresenter.init();

    if (this.#filmsModel.loadingFilms) {
      return;
    }

    this.#renderSort();
    render(this.#filmsBoardView, this.#boardContainer);
    render(this.#filmsSectionView, this.#filmsBoardView.element);
    this.#renderFilmsTitle();
    render(this.#filmsListContainerView, this.#filmsSectionView.element);


    const films = this.films;
    const filmsCount = films.length;


    this.#renderFilms(films.slice(0, Math.min(filmsCount, this.#renderedFilmsCount)));

    if (filmsCount > this.#renderedFilmsCount) {
      this.#renderShowMoreButton();
    }
  }
}
