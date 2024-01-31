import AbstractView from '../framework/view/abstract-view';
import createSortListViewTemplate from './templates/create-sort-list-view-template';

export default class SortListView extends AbstractView {
  get template() {
    return createSortListViewTemplate();
  }
}

