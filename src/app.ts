// eslint-disable-next-line import/extensions
import Header from './home-page/header/view';

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