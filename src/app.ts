import PageController from './pages/PageController';
import GeneralUserController from './pages/user-profile/UserProfileController';
import HomePageController from './pages/home-page/HomePageController';

import './scss/styles.scss';
import './pages/home-page/staticElements/style.scss';

class App {
    userPage: GeneralUserController;

    PageController: PageController;

    HomePageController: HomePageController;

    constructor() {
        this.userPage = new GeneralUserController();
        this.PageController = new PageController();
        this.HomePageController = new HomePageController();
    }

    static async start() {
        PageController.renderStructure();
        PageController.setControllers();

        const btn = document.querySelector('.profile-btn');
        btn?.addEventListener('click', () => {
            PageController.setUserProfileController();
        });
    }
}

const app = new App();
App.start();
