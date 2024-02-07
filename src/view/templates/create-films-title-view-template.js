import { FiltersType } from '../../const';

export default function createFilmsTitleViewTemplate(message) {
  const isHidden = Object.values(FiltersType).includes(message);
  const isAll = message === FiltersType.ALL ? `${FiltersType.ALL} movies. Upcoming` : `${message}. Upcoming`;

  return `<h2 class="films-list__title ${isHidden ? 'visually-hidden' : ''}">${isHidden ? isAll : message}</h2>`;
}
