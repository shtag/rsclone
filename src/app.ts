import './scss/styles.scss';
import PageController from './pages/PageController';
import './pages/home-page/staticElements/style.scss';
import './pages/home-page/postElements/style.scss';
import Router from './router';
import { sessionId } from './types/constants';

class App {
    static async start() {
        console.log('start');
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('userId', '1');
        Router.setEventListeners();
        PageController.renderStructure();
        PageController.setControllers();
        PageController.timeControl();
    }
}

App.start();
