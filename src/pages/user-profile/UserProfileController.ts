import UserPageController from './user-info/UserInfoController';
import UserPostsController from './user-posts/UserPostsController';

class GeneralUserController {
    static setGeneralController() {
        UserPageController.setUserInfo();
        UserPostsController.setPostsInfo();
        UserPostsController.setPosts();
        UserPostsController.setTabSwitch();
    }
}

export default GeneralUserController;
