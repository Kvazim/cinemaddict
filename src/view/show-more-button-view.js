import AbstractView from '../framework/view/abstract-view';
import createShowMoreButtonTemplate from './templates/create-show-more-button-template';

export default class ShowMoreButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();

    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickMoreButtonHandler);
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

  #clickMoreButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
