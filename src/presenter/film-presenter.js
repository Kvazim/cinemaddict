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

  #handleButtonControlsClick = (evt) => {
    switch (true) {
      case evt.target.classList.contains('film-card__controls-item--favorite'):
        return this.#dataChangeHandler(
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
      case evt.target.classList.contains('film-card__controls-item--add-to-watchlist'):
        return this.#dataChangeHandler(
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
      case evt.target.classList.contains('film-card__controls-item--mark-as-watched'):
        return this.#dataChangeHandler(
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
    }
  };

  init(film) {
    this.#film = film;
    const prevCardFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onButtonControlsClick: this.#handleButtonControlsClick,
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
