import AbstractView from '../framework/view/abstract-view';
import createFilmsBoardViewTemplate from './templates/create-films-board-view-template';

export default class FilmsBoardView extends AbstractView {
  get template() {
    return createFilmsBoardViewTemplate();
  }
}
