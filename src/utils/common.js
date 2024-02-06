import { MAX_SHORT_DESCRIPTION_LENGTH, MIN } from '../const';

const generateDescription = (description) => {
  if (description.length > MAX_SHORT_DESCRIPTION_LENGTH) {
    description = description.slice(MIN, MAX_SHORT_DESCRIPTION_LENGTH).concat('...');
  }
  return description;
};

const getActiveButton = (param) => param ? 'film-card__controls-item--active' : '';
const getFavoritesFilm = (film) => film.userDetails.favorite === true;
const getAlreadyWatchedFilm = (film) => film.userDetails.alreadyWatched === true;
const getWatchlistFilm = (film) => film.userDetails.watchlist === true;
const capitalize = (item) => item.charAt(0).toUpperCase() + item.substring(1);
const sortByRating = (filmFirst, filmSecond) => filmSecond.filmInfo.totalRating - filmFirst.filmInfo.totalRating;
const getWatchedFilms = (films) => films.filter((film) => film.userDetails.alreadyWatched === true).length;

const userRank = (filmsCount) => {
  switch (true) {
    case filmsCount > 0 && filmsCount <= 10:
      return'novice';
    case filmsCount > 10 && filmsCount <= 20:
      return'fan';
    case filmsCount > 20:
      return'movie buff';
  }

  return '';
};

export {
  generateDescription,
  getActiveButton,
  getFavoritesFilm,
  getAlreadyWatchedFilm,
  getWatchlistFilm,
  capitalize,
  sortByRating,
  getWatchedFilms,
  userRank,
};
