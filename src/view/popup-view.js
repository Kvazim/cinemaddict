import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import createPopupTemplate from './templates/create-popup-template';

export default class PopupView extends AbstractStatefulView {
  get template() {
    return createPopupTemplate();
  }
}
