import { remove, render, replace } from '../framework/render';
import UserProfileView from '../view/user-profile-view';

export default class UserProfilePresenter {
  #userProfileContainer = null;
  #userProfileComponent = null;

  constructor({userProfileContainer}) {
    this.#userProfileContainer = userProfileContainer;
  }

  init() {
    const prevUserProfileComponent = this.#userProfileComponent;
    this.#userProfileComponent = new UserProfileView();

    if (!prevUserProfileComponent) {
      render(this.#userProfileComponent, this.#userProfileContainer);
      return;
    }

    if (this.#userProfileContainer.contains(prevUserProfileComponent.element)) {
      replace(this.#userProfileComponent, prevUserProfileComponent);
    }

    remove(prevUserProfileComponent);
  }
}
