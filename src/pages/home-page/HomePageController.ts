import {PostElementsController, page} from './postElements/postElementsController';
import HeaderController from '../staticElements/HeaderController';
import HeaderView from '../staticElements/HeaderView';


class HomePageController {
    static setHomePageController() {
        HeaderView.renderHeaderContainer();
        HeaderController.switchTheme();
        HeaderController.loaderControlAnimation();
        PostElementsController.renderPosts(page);
        PostElementsController.checkPosition();
        PostElementsController.likeDislikePost();
        PostElementsController.likesToComment();
        PostElementsController.activeInput();
        PostElementsController.reply();
    }
}

export default HomePageController;
