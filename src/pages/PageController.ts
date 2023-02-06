import HomePageController from './home-page/HomePageController';
import GeneralUserController from './user-profile/UserProfileController';

class PageController {
    HomePageController: HomePageController;

    constructor() {
        this.HomePageController = new HomePageController();
    }

    static renderStructure() {
        const body = document.querySelector('body');
        if (body) {
            body.innerHTML = `
                <header class="container header"></header>
                <main class="container"></main>
                <footer class="container"></footer>
            `;
        }
    }

    static setControllers() {
        HomePageController.setHomePageController();
    }

    static setUserProfileController() {
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = '';
        }
        GeneralUserController.setGeneralController();
    }
}

export default PageController;
