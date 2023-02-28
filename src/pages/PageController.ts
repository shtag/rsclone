import AddPostController from './add-post/AddPostController';
import { PostElementsController, state } from './home-page/postElements/postElementsController';
import HeaderView from './staticElements/HeaderView';
import search from './staticElements/search/searchPopupController';
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
            <footer class="container">
            <a href="https://github.com/shtag">shtag</a>
            <a href="https://github.com/wozzzie">wozzzie</a>
            <a href="https://github.com/astap13">astap13</a>
            <a href="https://rs.school/js/">
                <img src="https://rs.school/images/rs_school_js.svg" height="30"> 
            </a>
            </footer>
            <div class="global_loader"></div>
        `;
    }

    static async setHomePageController() {
        HeaderView.renderHeaderContainer();
        PostElementsController.renderFeeds(state.page);
        await PostElementsController.checkPosition();
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
            if (target.closest('.favorite_btn')) {
                await PostElementsController.favorite(event);
            }
            if (target.closest('.delete_btn')) {
                await PostElementsController.delPost(event);
            }
        });
    }

    static setDictionary() {
        const toggler = document.querySelector('.settings__lang') as HTMLInputElement;
        // gweibnm язык в локал

    }
}

export default PageController;
