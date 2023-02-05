import {Header} from './pages/home-page/header/view';
import './scss/styles.scss';
import './pages/home-page/header/style.scss'

class App {
    header: Header;

    constructor() {
        this.header = new Header();
    }

    static async start() {
        Header.renderProducts();
        console.log('start');
    }
}

const app = new App();
App.start();