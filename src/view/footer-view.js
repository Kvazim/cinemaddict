import AbstractView from '../framework/view/abstract-view';
import createFooterTemplate from './templates/create-footer-template';

export default class FooterView extends AbstractView {
  #filmsCount = null;

  constructor({filmsCount}) {
    super();
    this.#filmsCount = filmsCount;
  }

  get template() {
    return createFooterTemplate(this.#filmsCount);
  }
}

