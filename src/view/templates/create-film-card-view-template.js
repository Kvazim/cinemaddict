import { DateFormat } from '../../const';
import { generateDescription, getActiveButton } from '../../utils/common';
import { getCalculateDuration, humanizeDate } from '../../utils/date';

export default function createFilmCardViewTemplate(film) {
  const {id, comments, filmInfo, userDetails} = film;

  return (
    `<article class="film-card" data-id="${id}">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${humanizeDate(filmInfo.release.date, DateFormat.DATE_YEAR)}</span>
          <span class="film-card__duration">${getCalculateDuration(filmInfo.duration)}</span>
          <span class="film-card__genre">${filmInfo.genre[0]}</span>
        </p>
        <img src="${filmInfo.poster}" alt="${filmInfo.title}" class="film-card__poster">
        <p class="film-card__description">${generateDescription(filmInfo.description)}</p>
        <span class="film-card__comments">${comments.length} comment${comments.length > 1 ? 's' : ''}</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getActiveButton(userDetails.watchlist)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getActiveButton(userDetails.alreadyWatched)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${getActiveButton(userDetails.favorite)}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
}
