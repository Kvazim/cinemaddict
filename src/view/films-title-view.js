import AbstractView from '../framework/view/abstract-view';
import createFilmsTitleViewTemplate from './templates/create-films-title-view-template';

export default class FilmsTitleView extends AbstractView {
  #message = null;

  constructor({message}) {
    super();

    this.#message = message;
  }

  get template() {
    return createFilmsTitleViewTemplate(this.#message);
  }
}
