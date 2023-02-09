import UserPageView from './UserInfoView';

class UserPageController {
    static setUserInfo() {
        const container = document.createElement('div');
        container.classList.add('container');

        const main = document.querySelector('main');
        main?.append(container);

        container.innerHTML = UserPageView.renderUserInfo();
    }
}

export default UserPageController;
