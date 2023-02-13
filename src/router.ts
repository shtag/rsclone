
import model from "./api/Model";
import HeaderView from "./pages/staticElements/HeaderView";
import LoginPageController from "./pages/login-page/LoginPageController";
import PageController from "./pages/PageController";

import HeaderController from './pages/staticElements/HeaderController';
import UserPostsController from './pages/user-profile/user-posts/UserPostsController';
import { User } from './types/types';


class Router {
    static route(event: Event) {
        const e = event || window.event;
        const target = (e.target as HTMLAnchorElement).closest('.route') as HTMLAnchorElement;
        if (!target) return;
        e.preventDefault();
        window.history.pushState({}, '', (e.target as HTMLAnchorElement).href || target.href);
        Router.handleLocation();
    }

    static async handleLocation() {
        const path: string[] = window.location.pathname.split('/');
        const users = await model.user.getAll();

        const user = users.find((us) => us.username === path[1]);
        if (user && path.length === 2) {
            Router.openProfile(user.id);
        } else if (path[1] === 'feed' && path.length === 2) {
            Router.openFeed();
        } else if (path[1] === 'login' && path.length === 2) {
            Router.openLogin();
        } else if (path[1] === '' && path.length === 2) {
            console.log('main page');
            window.history.pushState({}, '', '/feed');
            Router.openFeed();
        } else if (path[1] === 'p' && path.length === 3) {
            Router.openPost(+path[2]);
        } else if (user && path[2] === 'favorites' && path.length === 3) {
            Router.openFavorites();
        } else if (user && path[2] === 'posts' && path.length === 3) {
            Router.openPosts(user.id);
        } else {
            Router.open404();
        }
    }

    static async openProfile(id: number) {
        console.log("open profile")
        PageController.renderStructure();
        HeaderView.renderHeader();
        HeaderController.switchTheme();
        HeaderController.loaderControlAnimation();
        document.title = `${(await model.user.get(id)).username}'s profile`;
        await PageController.setUserProfileController(id);
    }

    static async openPost(id: number) {
        /* PageController.renderStructure();
        HeaderView.renderHeader();
        HeaderController.switchTheme();
        HeaderController.loaderControlAnimation(); */
        console.log(window.location.pathname.split('/'))
        if (window.location.pathname.split('/').length === 3) {
            await Router.openProfile((await model.post.get(id)).author)
        }
        await PageController.postPopup(id);
    }

    static async openPosts(id: number) {
        PageController.renderStructure();
        HeaderView.renderHeader();
        HeaderController.switchTheme();
        HeaderController.loaderControlAnimation();

        await UserPostsController.setPosts(id);
    }

    static async openLogin() {
        console.log("open login");
        document.title = 'Login'
        PageController.renderStructure();
        LoginPageController.renderLoginPage()
    }

    static openFavorites() {
        console.log('favorites');
        PageController.renderStructure();
        HeaderView.renderHeader();
        HeaderController.switchTheme();
        HeaderController.loaderControlAnimation();
    }

    static async openFeed() {
        console.log("open feed");
        PageController.renderStructure();
        const main = document.querySelector('main') as HTMLBodyElement;
        document.title = 'Feed';
        main.innerHTML = '';
        await PageController.setControllers();
    }

    static async open404() {
        console.log("open 404");
        const main = document.querySelector('main') as HTMLBodyElement;
        main.innerHTML = '';
        main.innerHTML = `
        <div class="page_404">
            <h1>This page not exist!</h1>
            <a href="/feed" class="route">Go to home page</a>
        </div>`;
    }

    static setEventListeners() {
        const body = document.querySelector('body') as HTMLElement;
        body.addEventListener('click', (e) => {
            const target = (e.target as HTMLElement).closest('.route') as HTMLAnchorElement;
            if (target) {
                console.log(target.href);
            }
            Router.route(e);
        });

        window.addEventListener('load', async () => {
            await Router.handleLocation();
        })
        window.addEventListener('popstate', async () => {
            await Router.handleLocation();
        })
    }
}

export default Router;
