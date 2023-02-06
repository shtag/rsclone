import HeaderController from './staticElements/HeaderController';
import HeaderView from './staticElements/HeaderView';

class HomePageController {
    HeaderController: HeaderController;

    HeaderView: HeaderView;

    constructor() {
        this.HeaderView = new HeaderView();
        this.HeaderController = new HeaderController();
    }

    static setHomePageController() {
        HeaderView.renderHeader();
        HeaderController.switchTheme();
    }
}

export default HomePageController;
