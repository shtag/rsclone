import HomePageController from './home-page/HomePageController';
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

    static timeControl() {
        const datetoday = new Date();
        const timenow = datetoday.getTime();
        const togler = document.querySelector('.theme') as HTMLInputElement;
        datetoday.setTime(timenow);
        const thehour = datetoday.getHours();
        const root = document.querySelector('body') as HTMLBodyElement;

        if (thehour >= 6 && thehour <= 18) {
            togler.checked = true;
            root.classList.add('light-theme');
        } else {
            togler.checked = false;
            root.classList.remove('light-theme');
        }
    }
}

export default PageController;
