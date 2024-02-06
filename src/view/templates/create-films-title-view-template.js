import { FiltersType } from '../../const';

export default function createFilmsTitleViewTemplate(message) {
  const isHidden = Object.values(FiltersType).includes(message);
  const isAll;
  if (isHidden) {
    isAll = message === FiltersType.ALL ? `${FiltersType.ALL} movies` : message;
    return isAll;
  }

  //All movies. Upcoming
  // console.log(isAll);
  return `<h2 class="films-list__title ${isHidden ? 'visually-hidden' : ''}">${message}</h2>`;
}
