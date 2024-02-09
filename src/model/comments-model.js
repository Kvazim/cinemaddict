import { UpdateType } from '../const';
import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #cinemaddictApiService = null;
  #comments = [];

  constructor({cinemaddictApiService}) {
    super();

    this.#cinemaddictApiService = cinemaddictApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (filmId) => {
    try {
      const comments = await this.#cinemaddictApiService.getComments(filmId);
      this.#comments = comments;
    } catch (error) {
      this.#comments = [];
    }

    this._notify(UpdateType.INIT);
  };

  // addNewComment = async (updateType, update, updatedComment) => {
  //   try {

  //   } catch (error) {
  //     throw new Error('Can\'t add comment');
  //   }
  // };
}
