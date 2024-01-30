import AbstractView from '../framework/view/abstract-view';
import createFilmsBoardView from './templates/create-films-section-view';

export default class FilmsBoardView extends AbstractView {
  get template() {
    return createFilmsBoardView();
  }
}
