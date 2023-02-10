import './scss/styles.scss';
import PageController from './pages/PageController';

import './pages/home-page/staticElements/style.scss';
import './pages/home-page/postElements/style.scss'
import Router from './router';

class App {
    static async start() {
        console.log('start');
        Router.setEventListeners();
        PageController.renderStructure();
        PageController.setControllers();
    }
}

App.start();
