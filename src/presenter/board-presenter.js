import { FILM_COUNT_PER_STEP, FiltersType, SortType, UserAction } from '../const';
import { UpdateType, TimeLimit } from '../const';
import { filter } from '../utils/filter';
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
import { sortByDate } from '../utils/date';
import { sortByRating } from '../utils/common';

export default class BoardPresenter {
  #boardContainer = null;
  #filterPresenter = null;
  #sortListView = null;
  #filmsModel = null;
  #filmsTitleComponent = null;
  #filterModel = null;
  #filterType = FiltersType.ALL;
  #currentSortType = SortType.DEFAULT;
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

  constructor({boardContainer, filmsModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filterPresenter = new FilterPresenter({filterContainer: this.#boardContainer, filmsModel: this.#filmsModel, filterModel: this.#filterModel});

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  // createPoint() {
  // this.#currentSortType = SortType.DAY;
  // this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

  // if (this.#systemMessageComponent) {
  //   render(this.#weapointListView, this.#boardContainer);
  //   remove(this.#systemMessageComponent);
  // }

  //   this.#newPointPresenter.init();
  // }

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
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
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
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredfilm = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...filteredfilm].sort(sortByDate);
      case SortType.RATING:
        return [...filteredfilm].sort(sortByRating);
    }

    return filteredfilm;
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

  #sortTypeChangeHandler = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortListView = new SortListView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#sortTypeChangeHandler,
    });
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

  #clearBoard({resetSortType = false} = {}) {
    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();

    remove(this.#sortListView);
    remove(this.#filmsSectionView);
    remove(this.#filmsTitleComponent);
    remove(this.#showMoreButtonComponent);

    // if (this.#systemMessageComponent) {
    //   remove(this.#systemMessageComponent);
    // }

    if(resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
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
