import './scss/styles.scss';
import './pages/home-page/header/style.scss'
import PageController from './pages/PageController';
import HeaderView from './pages/home-page/header/HeaderView';
import HeaderController from './pages/home-page/header/HeaderController';

class App {
    PageController: PageController;

    constructor() {
        this.PageController = new PageController();
    }

    static async start() {
        HeaderView.renderProducts();
        HeaderController.dayMode();
        console.log('start');
    }
}

const app = new App();
App.start();