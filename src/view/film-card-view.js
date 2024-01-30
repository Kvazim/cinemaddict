import AbstractView from '../framework/view/abstract-view';
import createFilmCardView from './templates/create-film-card-view';

export default class FilmCardView extends AbstractView {
  get template() {
    return createFilmCardView();
  }
}
