import AbstractView from '../framework/view/abstract-view';
import createFilmCardViewTemplate from './templates/create-film-card-view-template';

export default class FilmCardView extends AbstractView {
  #film = null;
  #handleButtonControlsClick = null;

  constructor({film, onButtonControlsClick}) {
    super();

    this.#film = film;
    this.#handleButtonControlsClick = onButtonControlsClick;

    this.element.querySelector('.film-card__controls').addEventListener('click', this.#buttonControlsClickHandler);
  }

  #buttonControlsClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonControlsClick(evt);
  };

  get template() {
    return createFilmCardViewTemplate(this.#film);
  }
}
