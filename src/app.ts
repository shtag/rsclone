import PageController from './pages/PageController';
import './scss/styles.scss';
import './pages/home-page/staticElements/style.scss';
import './pages/home-page/postElements/style.scss'
import Router from './router';

class App {
    static async start() {
        console.log('start');
        Router.setEventListeners();
        PageController.renderStructure();
        PageController.setControllers();

        const profileBtn = document.querySelector('.profile-btn');
        profileBtn?.addEventListener('click', () => {
            PageController.setUserProfileController();
        });
    }
}

App.start();
