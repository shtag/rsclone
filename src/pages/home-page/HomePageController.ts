import HeaderController from './header/HeaderController';
import HeaderView from './header/HeaderView';

class HomePageController {
    HeaderController: HeaderController;

    HeaderView: HeaderView;

    constructor() {
        this.HeaderView = new HeaderView();
        this.HeaderController = new HeaderController();
    }
    
}

export default HomePageController;
