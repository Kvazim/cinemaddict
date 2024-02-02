import AbstractView from '../framework/view/abstract-view';
import createFilmCardViewTemplate from './templates/create-film-card-view-template';

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor({film}) {
    super();

    this.#film = film;
  }

  get template() {
    return createFilmCardViewTemplate(this.#film);
  }
}
