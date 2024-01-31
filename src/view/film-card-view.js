import AbstractView from '../framework/view/abstract-view';
import createFilmCardViewTemplate from './templates/create-film-card-view-template';

export default class FilmCardView extends AbstractView {
  get template() {
    return createFilmCardViewTemplate();
  }
}
