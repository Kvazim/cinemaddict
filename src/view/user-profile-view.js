import AbstractView from '../framework/view/abstract-view';
import createUserTemplate from './templates/create-user-template';

export default class UserProfileView extends AbstractView {
  #watchedCount = null;

  constructor ({watchedCount}) {
    super();

    this.#watchedCount = watchedCount;
  }

  get template() {
    return createUserTemplate(this.#watchedCount);
  }
}
