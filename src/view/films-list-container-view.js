import AbstractView from '../framework/view/abstract-view';
import createFilmsListContainerView from './templates/create-films-list-container-view';

export default class FilmsListContainerView extends AbstractView {
  get template() {
    return createFilmsListContainerView();
  }
}
