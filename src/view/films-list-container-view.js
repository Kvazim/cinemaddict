import AbstractView from '../framework/view/abstract-view';
import createFilmsListContainerViewTemplate from './templates/create-films-list-container-view-template';

export default class FilmsListContainerView extends AbstractView {
  get template() {
    return createFilmsListContainerViewTemplate();
  }
}
