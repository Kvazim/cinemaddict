import { remove, render, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import { UpdateType, UserAction } from '../const';
import dayjs from 'dayjs';

export default class FilmPresenter {
  #filmsListContainer = null;
  #filmComponent = null;
  #film = null;
  #dataChangeHandler = null;
  #modeChangeHandler = null;

  constructor({filmsListContainer, onDataChange}) {
    this.#filmsListContainer = filmsListContainer;
    this.#dataChangeHandler = onDataChange;
  }

  #handleAddToWatchlistClick = () => {
    this.#dataChangeHandler(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          watchlist: !this.#film.userDetails.watchlist
        }
      },
    );
  };

  #handleWatchedClick = () => {
    this.#dataChangeHandler(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          alreadyWatched: !this.#film.userDetails.alreadyWatched,
          watchingDate: !this.#film.userDetails.alreadyWatched ? dayjs().toISOString() : null
        }
      },
    );
  };

  #handleFavoritClick = () => {
    this.#dataChangeHandler(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          favorite: !this.#film.userDetails.favorite
        }
      },
    );
  };

  init(film) {
    this.#film = film;
    const prevCardFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onAddWatchlistClick: this.#handleAddToWatchlistClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoritClick: this.#handleFavoritClick
    });

    if (prevCardFilmComponent === null) {
      render(this.#filmComponent, this.#filmsListContainer);
      return;
    }

    replace(this.#filmComponent, prevCardFilmComponent);
  }

  destroy() {
    remove(this.#filmComponent);
  }

  setSaving() {
    this.#filmComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    this.#filmComponent.shake();

    // const resetFormState = () => {
    //   this.#filmComponent.updateElement({
    //     isDisabled: false,
    //     isSaving: false,
    //     isDeleting: false,
    //   });
    // };

    // this.#filmComponent.shake(resetFormState);
  }
}
