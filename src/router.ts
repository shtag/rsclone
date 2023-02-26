import model from './api/Model';
import HeaderView from './pages/staticElements/HeaderView';
import LoginPageController from './pages/login-page/LoginPageController';
import PageController from './pages/PageController';
import HeaderController from './pages/staticElements/HeaderController';
import { PostElementsController, state } from './pages/home-page/postElements/postElementsController';
import search from './pages/staticElements/search/searchPopupController';
import { checkSession } from './types/functions';

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
        PageController.renderStructure();
        const user = users.find((us) => us.username === path[1]);
        if (user && path.length === 2) {
            Router.openProfile(user.id);
            localStorage.setItem('favorites', 'false');
        } else if (path[1] === 'feed' && path.length === 2) {
            Router.openFeed();
        } else if (path[1] === 'login' && path.length === 2) {
            Router.openLogin();
        } else if (path[1] === '' && path.length === 2) {
            window.history.pushState({}, '', '/feed');
            Router.openFeed();
        } else if (path[1] === 'p' && path.length === 3) {
            Router.openPost(+path[2]);
        } else if (path[1] === 'recommendation') {
            Router.openRecommendation();
        } else if (user && path[2] === 'favorites' && path.length === 3) {
            Router.openFavorites(user.id);
            localStorage.setItem('favorites', 'true');
        } else if (user && path[2] === 'posts' && path.length === 3) {
            Router.openPosts(user.id);
        } else if (path[1] === 'add') {
            Router.openAddPost()
        } else {
            Router.open404();
        }
        search.renderPopup();
    }

    static async openAddPost() {
        console.log('open add post');
        const sessionValid = await checkSession();
        if (!sessionValid) {
            window.history.pushState({}, '', '/login');
            Router.handleLocation();
            return;
        }
        await HeaderView.renderHeaderContainer();
        HeaderController.loaderControlAnimation();
        await PageController.addPost();
    }

    static async openProfile(id: number) {
        console.log('open profile');
        await HeaderView.renderHeaderContainer();
        HeaderController.loaderControlAnimation();
        document.title = `${(await model.user.get(id)).username}'s profile`;
        await PageController.setUserProfileController(id);
    }

    static async openPost(id: number) {
        console.log('open post');
        await HeaderView.renderHeaderContainer();
        HeaderController.loaderControlAnimation();
        PostElementsController.checkPosition();
        const main = document.querySelector('main') as HTMLBodyElement;
        document.title = 'Post';
        main.innerHTML = '';
        await PageController.setPost(id);
    }

    static async openPosts(id: number) {
        console.log('posts tab');
        document.title = `${(await model.user.get(id)).username}'s posts`;
        await HeaderView.renderHeaderContainer();
        HeaderController.loaderControlAnimation();

        await PageController.userPosts(id);
    }

    static async openLogin() {
        console.log('open login');
        const sessionValid = await checkSession();
        if (sessionValid) {
            window.history.pushState({}, '', '/feed');
            Router.handleLocation();
            return;
        }
        document.title = 'Login';
        const body = document.querySelector('body') as HTMLBodyElement;
        body.innerHTML = '';
        LoginPageController.renderLoginPage();
    }

    static async openFavorites(id: number) {
        console.log('favorites');
        document.title = `${(await model.user.get(id)).username}'s favorites`;
        await HeaderView.renderHeaderContainer();
        HeaderController.loaderControlAnimation();
        PageController.userFavorite(id);
    }

    static async openFeed() {
        console.log('open feed');
        const sessionValid = await checkSession();
        if (!sessionValid) {
            window.history.pushState({}, '', '/login');
            Router.handleLocation();
            return;
        }
        state.page = 1;
        document.title = 'Feed';
        HeaderController.loaderControlAnimation();
        PageController.setHomePageController();
    }

    static async openRecommendation() {
        console.log('open recommendation feed');
        document.title = 'Recommendation';
        HeaderController.loaderControlAnimation();
        PageController.setHomePageController();
    }

    static async open404() {
        console.log('open 404');
        const main = document.querySelector('main') as HTMLBodyElement;
        main.innerHTML = '';
        main.innerHTML = `
        <div class="page_404">
            <h1>This page not exist!</h1>
            <a href="/feed" class="route">Go to home page</a>
        </div>`;
    }

    static async setEventListeners() {
        const body = document.querySelector('body') as HTMLElement;
        body.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).closest('.route')) {
                Router.route(e);
            }
        });
        await Router.handleLocation();
        HeaderController.switchTheme();
        window.addEventListener('popstate', async () => {
            await Router.handleLocation();
        });
    }

    static async checkSession(): Promise<boolean> {
        const session = await model.auth.checkSession({ id: +localStorage.userId, sessionId: localStorage.sessionId });
        if (!localStorage.sessionId || localStorage.sessionId === '' || !session.sessionActive) {
            return false;
        }
        return true
    }
}

export default Router;
