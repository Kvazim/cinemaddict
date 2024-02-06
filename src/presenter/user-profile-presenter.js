import { remove, render, replace } from '../framework/render';
import { getWatchedFilms } from '../utils/common';
import UserProfileView from '../view/user-profile-view';

export default class UserProfilePresenter {
  #userProfileContainer = null;
  #userProfileComponent = null;
  #filmsModel = null;

  constructor({userProfileContainer, filmsModel}) {
    this.#userProfileContainer = userProfileContainer;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get watchedCount() {
    const films = this.#filmsModel.films;
    const watchedFilms = getWatchedFilms(films);

    return watchedFilms;
  }

  init() {
    const prevUserProfileComponent = this.#userProfileComponent;
    this.#userProfileComponent = new UserProfileView({watchedCount: this.watchedCount});

    if (!prevUserProfileComponent) {
      render(this.#userProfileComponent, this.#userProfileContainer);
      return;
    }

    if (this.#userProfileContainer.contains(prevUserProfileComponent.element)) {
      replace(this.#userProfileComponent, prevUserProfileComponent);
    }

    remove(prevUserProfileComponent);
  }

  #handleModelEvent = () => this.init();
}
