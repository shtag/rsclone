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

    static async setListeners() {
        const body = document.querySelector('body') as HTMLBodyElement;
        body.addEventListener('click', async (e) => {
            const target = e.target as HTMLElement;
            if (target.closest('.subscribe__btn')) {
                const users = await model.user.getAll();
                const username = window.location.pathname.split('/')[1];
                const user = users.find(u => u.username === username)
                if (user) {
                    UserPageController.subscribeToUser(user.id);
                }
            }
        })
    }
}

export default GeneralUserController;
