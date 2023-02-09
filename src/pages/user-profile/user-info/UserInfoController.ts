import UserPageView from './UserInfoView';

class UserPageController {
    static setUserInfo() {
        const user = document.createElement('div');
        user.classList.add('user');

        const main = document.querySelector('main');
        main?.append(user);

        user.innerHTML = UserPageView.renderUserInfo();
    }
}

export default UserPageController;
