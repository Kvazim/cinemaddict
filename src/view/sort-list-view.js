import AbstractView from '../framework/view/abstract-view';
import createSortListView from './templates/create-sort-list-view';

export default class SortListView extends AbstractView {
  get template() {
    return createSortListView();
  }
}

