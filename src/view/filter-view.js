import AbstractView from '../framework/view/abstract-view';
import createFilterListTemplate from './templates/create-filter-list-template';

export default class FilterListView extends AbstractView {
  // #filters = null;
  // #currentFilter = null;
  // #handleFilterTypeChange = null;

  get template() {
    return createFilterListTemplate();
  }
}

