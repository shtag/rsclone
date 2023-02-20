import HomePageController from './home-page/HomePageController';
import { PostElementsController } from './home-page/postElements/postElementsController';
import OpenPostController from './user-profile/post/OpenPostController';
import GeneralUserController from './user-profile/UserProfileController';

class PageController {
    HomePageController: HomePageController;

    constructor() {
        this.HomePageController = new HomePageController();
    }

    static renderStructure() {
        const body = document.querySelector('body') as HTMLBodyElement;
        const header = document.querySelector('header');
        const main = document.querySelector('main');
        const footer = document.querySelector('footer');

        if (header && main && footer) {
            return;
        }
        body.innerHTML = `
            <header class="container header"></header>
            <main class="container"></main>
            <footer class="container"></footer>
        `;
    }

    static setControllers() {
        HomePageController.setHomePageController();
    }

    static async setUserProfileController(id: number) {
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = '';
        }
        await GeneralUserController.setGeneralController(id);
    }

    static async userFavorite(id: number) {
        const main = document.querySelector('.post__block');
        if (main) {
            main.innerHTML = '';
        }
        await GeneralUserController.setFavController(id);
    }

    static async userPosts(id: number) {
        const main = document.querySelector('.post__block');
        if (main) {
            main.innerHTML = '';
        }

        GeneralUserController.setPosts(id);
    }

    static async setPost(postId: number) {
        await OpenPostController.setPost(postId);
    }

    static setEventListener(){
        const body = document.querySelector('body') as HTMLBodyElement;
        body.addEventListener('click', async (event) => {
            const target = event.target as HTMLButtonElement;
            if (target.closest('.imput_comment_btn')) {
                await PostElementsController.comment(event);
            }
        })
    }
}

export default PageController;
