import AbstractView from '../framework/view/abstract-view';
import createUserTemplate from './templates/create-user-template';

export default class UserProfileView extends AbstractView {

  get template() {
    return createUserTemplate();
  }
}
