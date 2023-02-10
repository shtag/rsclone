import PageController from './pages/PageController';
import './scss/styles.scss';
import './pages/home-page/staticElements/style.scss';
import './pages/home-page/postElements/style.scss'



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

App.start();
