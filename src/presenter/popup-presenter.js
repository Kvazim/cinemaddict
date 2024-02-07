import { RenderPosition, render, replace } from '../framework/render';
import PopupView from '../view/popup-view';

export default class PopupPresenter {
  #popupContainer = null;
  #popupComponent = null;
  #film = null;

  constructor({popupContainer}) {
    this.#popupContainer = popupContainer;
  }

  init(film) {
    this.#film = film;
    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new PopupView();

    if (prevPopupComponent === null) {
      render(this.#popupComponent, this.#popupContainer, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#popupComponent, prevPopupComponent);
  }
}
