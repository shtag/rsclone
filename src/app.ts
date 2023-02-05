import UserPageController from './pages/user-profile/user-info/UserInfoController';
import GeneralUserController from './pages/user-profile/UserProfileController';

import './scss/styles.scss';

class App {
    userPage: GeneralUserController;

    constructor() {
        this.userPage = new GeneralUserController();
    }

    static async start() {
        GeneralUserController.setGeneralController();
        console.log('start');
    }
}

const app = new App();
App.start();
