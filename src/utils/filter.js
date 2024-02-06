import { FiltersType } from '../const';
import { getAlreadyWatchedFilm, getFavoritesFilm } from './common';

const filter = {
  [FiltersType.ALL]: (films) => films,
  [FiltersType.FAVORITES]: (films) => films.filter((film) => getFavoritesFilm(film)),
  [FiltersType.HISTORY]: (films) => films.filter((film) => getAlreadyWatchedFilm(film)),
  [FiltersType.WATCHLIST]: (films) => films.filter((film) => getAlreadyWatchedFilm(film)),
};

export {filter};
