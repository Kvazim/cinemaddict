import AbstractView from '../framework/view/abstract-view';
import createFilmsSectionView from './templates/create-films-section-view';

export default class FilmsSectionView extends AbstractView {
  get template() {
    return createFilmsSectionView();
  }
}
