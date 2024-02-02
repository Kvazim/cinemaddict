import { UpdateType } from '../const';
import Observable from '../framework/observable';

export default class FilmsModel extends Observable {
  #cinemaddictApiService = null;
  #films = [];
  #isLoading = true;
  #isLoadingFailed = false;

  constructor({cinemaddictApiService}) {
    super();

    this.#cinemaddictApiService = cinemaddictApiService;
  }

  async init() {
    try {
      const films = await this.#cinemaddictApiService.films;
      this.#films = films.map(this.#adaptToClient);
      this.#isLoading = false;
    } catch (error) {
      this.#films = [];
      this.#isLoading = false;
      this.#isLoadingFailed = true;
    }

    this._notify(UpdateType.INIT);
  }

  get films() {
    return this.#films;
  }

  get loadingFilms() {
    return this.#isLoading;
  }

  get loadingFailedFilms() {
    return this.#isLoadingFailed;
  }

  async updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    try {
      const response = await this.#cinemaddictApiService.updateFilm(update);
      const updatedFilm = this.#adaptToClient(response);

      this.#films = [
        ...this.#films.slice(0, index),
        updatedFilm,
        ...this.#films.slice(index + 1),
      ];

      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t update film');
    }
  }

  #adaptToClient(film) {
    const adaptedFilm = {
      ...film,
      filmInfo: {
        ...film.film_info,
        alternativeTitle: film.film_info.alternative_title,
        totalRating: film.film_info.total_rating,
        ageRating: film.film_info.age_rating,
        release: {
          ...film.film_info.release,
          releaseCountry: film.film_info.release.release_country,
        },
      },
      userDetails: {
        ...film.user_details,
        alreadyWatched: film.user_details.already_watched,
        watchingDate: film.user_details.watching_date,
      },
    };

    delete adaptedFilm.film_info;
    delete adaptedFilm.filmInfo.age_rating;
    delete adaptedFilm.filmInfo.alternative_title;
    delete adaptedFilm.filmInfo.release.release_country;
    delete adaptedFilm.filmInfo.total_rating;
    delete adaptedFilm.user_details;
    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watching_date;

    return adaptedFilm;
  }
}
