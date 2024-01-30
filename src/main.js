import BoardPresenter from './presenter/board-presenter';
import UserProfilePresenter from './presenter/user-profile-presenter';

const userProfile = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const userProfilePresenter = new UserProfilePresenter({userProfileContainer: userProfile});
const boardPresenter = new BoardPresenter({boardContainer: mainElement});

userProfilePresenter.init();
console.log(mainElement);
boardPresenter.init();
