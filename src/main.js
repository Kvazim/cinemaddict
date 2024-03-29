import CinemaddictApiService from './cinemaddict-api-service';
import { AUTHORIZATION, SERVER_URL } from './const';
import CommentsModel from './model/comments-model';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import BoardPresenter from './presenter/board-presenter';
import UserProfilePresenter from './presenter/user-profile-presenter';

const userProfile = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const popupElement = document.querySelector('body');

const filmsModel = new FilmsModel({cinemaddictApiService: new CinemaddictApiService(SERVER_URL, AUTHORIZATION)});
const commentsModel = new CommentsModel({cinemaddictApiService: new CinemaddictApiService(SERVER_URL, AUTHORIZATION)});
const filterModel = new FilterModel();

const userProfilePresenter = new UserProfilePresenter({userProfileContainer: userProfile, filmsModel});
const boardPresenter = new BoardPresenter({boardContainer: mainElement, filmsModel, commentsModel, filterModel, popupContainer: popupElement});

filmsModel.init();

userProfilePresenter.init();
boardPresenter.init();


