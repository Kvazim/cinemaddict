import AbstractView from '../framework/view/abstract-view';
import createFilmsSectionViewTemplate from './templates/create-films-section-view-template';

export default class FilmsSectionView extends AbstractView {
  get template() {
    return createFilmsSectionViewTemplate();
  }
}
