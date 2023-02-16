import './scss/styles.scss';
import './pages/staticElements/style.scss';
import './pages/home-page/postElements/style.scss'

import Router from './router';
import { sessionId } from './types/constants';
import PageController from './pages/PageController';

class App {
    static async start() {
        console.log('start');
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('userId', '1');
        Router.setEventListeners();
        PageController.setEventListener();
    }
}

App.start();
