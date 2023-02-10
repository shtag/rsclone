import './scss/styles.scss';
import Router from './router';

class App {
    static async start() {
        console.log('start');
        Router.setEventListeners();
    }
}

App.start();
