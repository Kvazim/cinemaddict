const FILM_COUNT_PER_STEP = 5;
const MINUTES_IN_HOUR = 60;
const MIN = 0;
const MAX_SHORT_DESCRIPTION_LENGTH = 140;

const ApiMetod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SERVER_URL = 'https://22.objects.htmlacademy.pro/cinemaddict';

const BaseUrl = {
  MOVIES: 'movies',
  COMMENTS: 'comments',
};

const AUTHORIZATION = 'Basic S3ZhemltOmthc2FuZHJh';

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const DateFormat = {
  DATE_YEAR: 'YYYY',
  MINUTES: 'mm[m]',
  HOUR_MINUTES: 'H[h] mm[m]',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  UPDATE_POPUP: 'UPDATE_POPUP',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const FiltersType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export {
  FILM_COUNT_PER_STEP,
  ApiMetod,
  SERVER_URL,
  BaseUrl,
  AUTHORIZATION,
  UpdateType,
  DateFormat,
  MINUTES_IN_HOUR,
  MIN,
  MAX_SHORT_DESCRIPTION_LENGTH,
  UserAction,
  TimeLimit,
  FiltersType,
  SortType,
};
