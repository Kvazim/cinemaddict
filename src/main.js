import CinemaddictApiService from './cinemaddict-api-service';
import { AUTHORIZATION, SERVER_URL } from './const';
import BoardPresenter from './presenter/board-presenter';
import UserProfilePresenter from './presenter/user-profile-presenter';

const userProfile = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const films = new CinemaddictApiService(SERVER_URL, AUTHORIZATION);
console.log(films.films);
console.log(films.adaptedFilm);
const userProfilePresenter = new UserProfilePresenter({userProfileContainer: userProfile});
const boardPresenter = new BoardPresenter({boardContainer: mainElement});

userProfilePresenter.init();
boardPresenter.init();
