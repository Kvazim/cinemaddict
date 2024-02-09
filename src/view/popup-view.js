import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import createPopupTemplate from './templates/create-popup-template';

export default class PopupView extends AbstractStatefulView {
  #handleCloseButtonClick = null;
  #film = null;

  constructor({onCloseButtonClick, film}) {
    super();

    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#film = film;

    this._restoreHandlers();
  }

  get template() {
    return createPopupTemplate(this.#film);
  }

  #closeButtonClickHandler = () => {
    this.#handleCloseButtonClick();
  };

  _restoreHandlers() {
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
    this.element.querySelector('.film-details__controls').addEventListener('click', this.#closeButtonClickHandler);
  }
}
