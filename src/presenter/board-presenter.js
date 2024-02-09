import { FILM_COUNT_PER_STEP, FiltersType, SortType, SystemMessageLoad, SystemMessageList, UserAction } from '../const';
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
import FooterView from '../view/footer-view';
import FilmPresenter from './film-presenter';
import FilterPresenter from './filter-presenter';
import PopupPresenter from './popup-presenter';
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
  #popupContainer = null;
  #popupComponent = null;
  #filmsBoardView = new FilmsBoardView();
  #filmsSectionView = new FilmsSectionView();
  #filmsListContainerView = new FilmsListContainerView();
  #systemMessageComponent = null;
  #showMoreButtonComponent = null;
  #renderedFilmsCount = FILM_COUNT_PER_STEP;
  #filmPresenters = new Map();
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({boardContainer, filmsModel, filterModel, popupContainer}) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;
    this.#popupContainer = popupContainer;

    this.#filterPresenter = new FilterPresenter({filterContainer: this.#boardContainer, filmsModel: this.#filmsModel, filterModel: this.#filterModel});
    this.#popupComponent = new PopupPresenter({popupContainer: this.#popupContainer});
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
        this.#removeSystemMessage();
        this.#renderBoard();
        this.#renderFooterFilmStatistic();
        break;
    }
  };

  #handleActionView = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmPresenters.get(update.id).setSaving();
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

  #renderFooterFilmStatistic = () => render(new FooterView({filmsCount: this.films.length}), document.querySelector('.footer__statistics'));

  #renderFilmsTitle(message) {
    this.#filmsTitleComponent = new FilmsTitleView({message});

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

    if(resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

    this.#filmsSectionView.element.removeEventListener('click', this.#filmCardClickHandler);
  }

  #renderSystemMessage(message) {
    render(this.#filmsBoardView, this.#boardContainer);
    render(this.#filmsSectionView, this.#filmsBoardView.element);
    this.#renderFilmsTitle(message);
  }

  #removeSystemMessage() {
    remove(this.#filmsBoardView);
    remove(this.#filmsSectionView);
    remove(this.#filmsTitleComponent);
  }

  #createPopup(id) {
    this.#popupComponent.init(this.films, id);

    this.#popupContainer.classList.add('hide-overflow');
  }

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.parentElement !== null && evt.target.parentElement.tagName === 'A') {
      this.#createPopup(evt.target.offsetParent.dataset.id);
    }
  };

  #renderBoard() {
    this.#filterPresenter.init();

    const films = this.films;
    const filmsCount = films.length;

    if (this.#filmsModel.loadingFilms) {
      this.#renderSystemMessage(SystemMessageLoad.LOAD);
      return;
    }

    if (this.#filmsModel.loadingFailedFilms) {
      this.#renderSystemMessage(SystemMessageLoad.FAILED_LOAD);
      return;
    }

    if (this.filmsCount === 0) {
      this.#renderSystemMessage(SystemMessageList[this.#filterType]);
      return;
    }

    this.#renderSort();
    render(this.#filmsBoardView, this.#boardContainer);
    render(this.#filmsSectionView, this.#filmsBoardView.element);
    this.#renderFilmsTitle(this.#filterType);
    render(this.#filmsListContainerView, this.#filmsSectionView.element);

    this.#renderFilms(films.slice(0, Math.min(filmsCount, this.#renderedFilmsCount)));

    if (filmsCount > this.#renderedFilmsCount) {
      this.#renderShowMoreButton();
    }

    this.#filmsSectionView.element.addEventListener('click', this.#filmCardClickHandler);
  }
}
