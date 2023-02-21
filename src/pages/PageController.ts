import AddPostController from './add-post/AddPostController';
import { page, PostElementsController } from './home-page/postElements/postElementsController';
import HeaderController from './staticElements/HeaderController';
import HeaderView from './staticElements/HeaderView';
import OpenPostController from './user-profile/post/OpenPostController';
import GeneralUserController from './user-profile/UserProfileController';

class PageController {
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

    static setHomePageController() {
        HeaderView.renderHeaderContainer();
        HeaderController.switchTheme();
        PostElementsController.renderFeeds(page);
        PostElementsController.checkPosition();
        PostElementsController.likesToComment();
        PostElementsController.activeInput();
        PostElementsController.reply();
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

    static async addPost() {
        const main = document.querySelector('.post__block');
        if (main) {
            main.innerHTML = '';
        }
        AddPostController.setAddPost();
    }

    static setEventListener() {
        const body = document.querySelector('body') as HTMLBodyElement;
        body.addEventListener('click', async (event) => {
            const target = event.target as HTMLButtonElement;
            if (target.closest('.imput_comment_btn')) {
                await PostElementsController.comment(event);
            }
            if (target.closest('.like_btn')) {
                await PostElementsController.likeDislikePost(event);
            }
        });
    }
}

export default PageController;
