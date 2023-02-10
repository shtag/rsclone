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

    static timeControl() {
        const datetoday = new Date(); 
        const timenow=datetoday.getTime();
        const togler = document.querySelector('.theme') as HTMLInputElement;
        datetoday.setTime(timenow); 
        const thehour = datetoday.getHours();
        const root = document.querySelector('body') as HTMLBodyElement;

        if (thehour >= 6 && thehour <= 18) {
            togler.checked = true;
            root.classList.add('light-theme');
        }
        else {
            togler.checked = false;
            root.classList.remove('light-theme');
        }
    }
}

export default PageController;
