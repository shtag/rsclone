import {PostElementsController, page} from './postElements/postElementsController';
import HeaderController from './staticElements/HeaderController';
import HeaderView from './staticElements/HeaderView';

class HomePageController {
    HeaderController: HeaderController;

    PostElementsController: PostElementsController;

    HeaderView: HeaderView;


    constructor() {
        this.HeaderView = new HeaderView();
        this.HeaderController = new HeaderController();
        this.PostElementsController = new PostElementsController();
    }

    static async setHomePageController() {
        HeaderView.renderHeader();
        HeaderController.switchTheme();
        HeaderController.loaderControlAnimation();
        PostElementsController.renderPosts(page);
        PostElementsController.checkPosition();
        PostElementsController.likeDislikePost();
        PostElementsController.comment();
        
    }
}

export default HomePageController;
