import PageController from './pages/PageController';
import GeneralUserController from './pages/user-profile/UserProfileController';
import HomePageController from './pages/home-page/HomePageController';

import './scss/styles.scss';
import './pages/home-page/staticElements/style.scss';

class App {
    static async start() {
        PageController.renderStructure();
        PageController.setControllers();

        const profileBtn = document.querySelector('.profile-btn');
        profileBtn?.addEventListener('click', () => {
            PageController.setUserProfileController();
        });
    }
}

const app = new App();
App.start();
