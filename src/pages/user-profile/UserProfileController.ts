import UserPageController from './user-info/UserInfoController';
import UserPostsController from './user-posts/UserPostsController';

class GeneralUserController {
    static setGeneralController() {
        const apiUrl =
            'https://api.unsplash.com/search/photos?query=cats&per_page=30&orientation=landscape&client_id=6vebiGSWISfyPAqACIbzaXa_49SfW3vjJMvZSS4VHIw';
        UserPageController.setUserInfo();
        UserPostsController.setUserInfo();
        UserPostsController.getData(apiUrl);
    }
}

export default GeneralUserController;
