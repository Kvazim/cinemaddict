import AbstractView from '../framework/view/abstract-view';
import createFilmsTitleViewTemplate from './templates/create-films-title-view-template';

export default class FilmsTitleView extends AbstractView {
  get template() {
    return createFilmsTitleViewTemplate();
  }
}
