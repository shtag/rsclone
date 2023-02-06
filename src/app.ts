import './scss/styles.scss';
import './pages/home-page/staticElements/style.scss'
import PageController from './pages/PageController';
import HeaderView from './pages/home-page/staticElements/HeaderView';
import HeaderController from './pages/home-page/staticElements/HeaderController';

class App {
    PageController: PageController;

    constructor() {
        this.PageController = new PageController();
    }

    static async start() {
        HeaderView.renderHeader();
        HeaderController.switchTheme();
        console.log('start');
    }
}

const app = new App();
App.start();