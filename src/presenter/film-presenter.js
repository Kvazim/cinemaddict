import { render } from "../framework/render";
import FilmCardView from "../view/film-card-view";

export default class FilmPresenter {
  #filmsListContainer = null;
  #filmComponent = null;

  constructor({filmsListContainer}) {
    this.#filmsListContainer = filmsListContainer;
  }

  init() {
    this.#filmComponent = new FilmCardView();
    render(this.#filmComponent, this.#filmsListContainer);
  }
}
