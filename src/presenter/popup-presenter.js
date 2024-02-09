import { RenderPosition, remove, render, replace } from '../framework/render';
import PopupView from '../view/popup-view';
import { getFilmById, isEscape } from '../utils/common';

export default class PopupPresenter {
  #popupContainer = null;
  #popupComponent = null;
  // #destroyHandler = null;
  #film = null;
  // #comments = [];

  constructor({popupContainer}) {
    this.#popupContainer = popupContainer;
  }

  init(films, id, comments) {
    this.#film = getFilmById(films, id);
    // this.#comments = comments;

    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new PopupView({onCloseButtonClick: this.#handleCloseButtonClick, film: this.#film, comments});

    if (prevPopupComponent === null) {
      render(this.#popupComponent, this.#popupContainer, RenderPosition.BEFOREEND);
      this.#popupContainer.addEventListener('keydown', this.#escKeyDownHandler);
      return;
    }

    replace(this.#popupComponent, prevPopupComponent);

    this.#popupContainer.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#popupComponent === null) {
      return;
    }

    // this.#destroyHandler();

    remove(this.#popupComponent);
    this.#popupComponent = null;

    this.#popupContainer.classList.remove('hide-overflow');

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleCloseButtonClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
