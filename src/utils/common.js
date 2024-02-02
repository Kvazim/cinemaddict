import { MAX_SHORT_DESCRIPTION_LENGTH, MIN } from '../const';

const generateDescription = (description) => {
  if (description.length > MAX_SHORT_DESCRIPTION_LENGTH) {
    description = description.slice(MIN, MAX_SHORT_DESCRIPTION_LENGTH).concat('...');
  }
  return description;
};

const getActiveButton = (param) => param ? 'film-card__controls-item--active' : '';

export {
  generateDescription,
  getActiveButton,
};
