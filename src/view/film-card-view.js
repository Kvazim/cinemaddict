import AbstractView from '../framework/view/abstract-view';
import createFilmCardViewTemplate from './templates/create-film-card-view-template';

export default class FilmCardView extends AbstractView {
  #film = null;
  #handleAddToWatchlistClick = null;
  #handleWatchedClick = null;
  #handleFavoritClick = null;

  constructor({film, onAddWatchlistClick, onWatchedClick, onFavoritClick}) {
    super();

    this.#film = film;
    this.#handleAddToWatchlistClick = onAddWatchlistClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoritClick = onFavoritClick;

    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#buttonAddToWatchlistClickHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#buttonWatchedClickHandler);
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#buttonFavoritClickHandler);
  }

  #buttonAddToWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAddToWatchlistClick();
  };

  #buttonWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchedClick();
  };

  #buttonFavoritClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoritClick();
  };

  get template() {
    return createFilmCardViewTemplate(this.#film);
  }
}
