import PageController from './pages/PageController';
import GeneralUserController from './pages/user-profile/UserProfileController';
import HomePageController from './pages/home-page/HomePageController';
import ModelPosts from './api/Model-components/Model-posts';
import './scss/styles.scss';
import './pages/home-page/staticElements/style.scss';
import './pages/home-page/postElements/style.scss'
import ModelUsers from './api/Model-components/Model-users';



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
