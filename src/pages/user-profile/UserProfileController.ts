import PostPopupController from './post-popup/postPopupController';
import UserPageController from './user-info/UserInfoController';
import UserPostsController from './user-posts/UserPostsController';

class GeneralUserController {
    static async setGeneralController(id: number) {
        await UserPageController.setUserInfo(id);
        UserPostsController.setPostsInfo();
        await UserPostsController.setPosts(id);
        // UserPostsController.setTabSwitch(id);
    }
}

export default GeneralUserController;
