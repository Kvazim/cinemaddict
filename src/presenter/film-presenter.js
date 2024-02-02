import { render } from '../framework/render';
import FilmCardView from '../view/film-card-view';

export default class FilmPresenter {
  #filmsListContainer = null;
  #filmComponent = null;
  #film = null;

  constructor({filmsListContainer, film}) {
    this.#filmsListContainer = filmsListContainer;
    this.#film = film;
  }

  init() {
    this.#filmComponent = new FilmCardView({film: this.#film});
    render(this.#filmComponent, this.#filmsListContainer);
  }
}
