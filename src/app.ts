import './scss/styles.scss';
import './pages/home-page/staticElements/style.scss';
import PageController from './pages/PageController';
import HeaderView from './pages/home-page/staticElements/HeaderView';
import HeaderController from './pages/home-page/staticElements/HeaderController';
import GeneralUserController from './pages/user-profile/UserProfileController';

class App {
    userPage: GeneralUserController;

    PageController: PageController;

    constructor() {
        this.userPage = new GeneralUserController();
        this.PageController = new PageController();
    }

    static async start() {
        // GeneralUserController.setGeneralController();
        HeaderView.renderHeader();
        HeaderController.switchTheme();
        console.log('start');
        const btn = document.querySelector('.profile-btn');
        console.log(btn);
        btn?.addEventListener('click', () => {
            GeneralUserController.setGeneralController();
        });
    }
}

const app = new App();
App.start();
