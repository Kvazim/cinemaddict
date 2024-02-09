import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import createPopupTemplate from './templates/create-popup-template';

export default class PopupView extends AbstractStatefulView {
  #handleCloseButtonClick = null;
  #film = null;
  #comments = [];

  constructor({onCloseButtonClick, film, comments}) {
    super();

    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#film = film;
    this.#comments = comments;

    this._restoreHandlers();
  }

  get template() {
    return createPopupTemplate(this.#film, this.#comments);
  }

  #closeButtonClickHandler = () => {
    this.#handleCloseButtonClick();
  };

  _restoreHandlers() {
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
    this.element.querySelector('.film-details__controls').addEventListener('click', this.#closeButtonClickHandler);
  }
}
