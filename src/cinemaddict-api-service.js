import { ApiMetod, BaseUrl } from './const';
import ApiService from './framework/api-service';

export default class CinemaddictApiService extends ApiService {
  get films() {
    return this._load({url: BaseUrl.MOVIES}).then(ApiService.parseResponse);
  }

  async getComments(film) {
    return this._load({url: `${BaseUrl.COMMENTS}/${film}`}).then(ApiService.parseResponse);
  }

  async updateFilm(film) {
    const response = await this._load({
      url: `${BaseUrl.MOVIES}/${film.id}`,
      method: ApiMetod.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addNewComment(film) {
    const response = await this._load({
      url: `${BaseUrl.COMMENTS}/${film.id}`,
      method: ApiMetod.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteComment(film) {
    const response = await this._load({
      url: `${BaseUrl.COMMENTS}/${film.id}`,
      method: ApiMetod.DELETE,
    });

    return response;
  }

  #adaptToServer(film) {
    const adaptedFilm = {
      ...film,
      'film_info': {
        ...film.filmInfo,
        'alternative_title': film.filmInfo.alternativeTitle,
        'total_rating': film.filmInfo.totalRating,
        'age_rating': film.filmInfo.ageRating,
        'release': {
          ...film.filmInfo.release,
          'release_country': film.filmInfo.release.releaseCountry,
        },
      },
      'user_details': {
        ...film.userDetails,
        'already_watched': film.userDetails.alreadyWatched,
        'watching_date': film.userDetails.watchingDate,
      },
    };

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.film_info.alternativeTitle;
    delete adaptedFilm.filmInfo.totalRating;
    delete adaptedFilm.film_info.release.releaseCountry;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  }
}
