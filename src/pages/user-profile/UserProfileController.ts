import model from '../../api/Model';
import UserFavController from './user-favorite/UserFavController';
import UserPageController from './user-info/UserInfoController';
import UserPostsController from './user-posts/UserPostsController';

class GeneralUserController {
    static async setGeneralController(id: number) {
        await UserPageController.setUserInfo(id);
        UserPostsController.setPostsInfo();
        await UserPostsController.setPosts(id);
    }

    static async setFavController(id: number) {
        const user = document.querySelector('.user');
        const openPost = document.querySelector('.open__post-block') as HTMLDivElement;

        if (openPost) {
            openPost.style.display = 'none';
        }

        if (!user) {
            await UserPageController.setUserInfo(id);
        }

        UserPostsController.setPostsInfo();
        await UserFavController.setFavPosts(id);
    }

    static async setPosts(id: number) {
        const user = document.querySelector('.user');

        if (!user) {
            await UserPageController.setUserInfo(id);
        }
        UserPostsController.setPostsInfo();
        await UserPostsController.setPosts(id);
    }

    static async checkSession(sessionId: string, id: number) {
        const user = await model.user.get(id);
        const { sessions } = user;

        if (sessions.includes(sessionId)) {
            return { equal: true };
        }

        return { equal: false, username: user.username };
    }
}

export default GeneralUserController;
