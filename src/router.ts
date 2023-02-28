import model from './api/Model';
import HeaderView from './pages/staticElements/HeaderView';
import LoginPageController from './pages/login-page/LoginPageController';
import PageController from './pages/PageController';
import HeaderController from './pages/staticElements/HeaderController';
import { PostElementsController, state } from './pages/home-page/postElements/postElementsController';
import search from './pages/staticElements/search/searchPopupController';
import { checkSession } from './types/functions';
import LoadersView from './pages/staticElements/loaders/loadersView';

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
        PageController.renderStructure();
        const loader = document.querySelector('.global_loader') as HTMLElement;
        loader.classList.remove('display_none');
        loader.innerHTML = LoadersView.addGlobal();
        loader.classList.add('flex_center')

        const path: string[] = window.location.pathname.split('/');
        const users = await model.user.getAll();
        const user = users.find((us) => us.username === path[1]);
        if (user && path.length === 2) {
            await Router.openProfile(user.id);
            localStorage.setItem('favorites', 'false');
        } else if (path[1] === 'feed' && path.length === 2) {
            await Router.openFeed();
        } else if (path[1] === 'login' && path.length === 2) {
            await Router.openLogin();
        } else if (path[1] === '' && path.length === 2) {
            window.history.pushState({}, '', '/feed');
            await Router.openFeed();
        } else if (path[1] === 'p' && path.length === 3) {
            await Router.openPost(+path[2]);
        } else if (path[1] === 'recommendation') {
            await Router.openRecommendation();
        } else if (user && path[2] === 'favorites' && path.length === 3) {
            await Router.openFavorites(user.id);
            localStorage.setItem('favorites', 'true');
        } else if (user && path[2] === 'posts' && path.length === 3) {
            await Router.openPosts(user.id);
            localStorage.setItem('favorites', 'false');
        } else if (path[1] === 'add') {
            await Router.openAddPost();
        } else {
            await Router.open404();
        }

        await search.renderPopup();
        const html = document.querySelector('html') as HTMLElement;
        const loader2 = document.querySelector('.global_loader') as HTMLElement;
        setTimeout(() => {
            loader2.classList.add('display_none');
        }, 400)
        html.style.overflow = '';
    }

    static async openAddPost() {
        const sessionValid = await checkSession();
        if (!sessionValid) {
            window.history.pushState({}, '', '/login');
            Router.handleLocation();
            return;
        }
        await HeaderView.renderHeaderContainer();
        await PageController.addPost();
    }

    static async openProfile(id: number) {
        await HeaderView.renderHeaderContainer();
        document.title = `${(await model.user.get(id)).username}'s profile`;
        await PageController.setUserProfileController(id);
    }

    static async openPost(id: number) {
        await HeaderView.renderHeaderContainer();
        PostElementsController.checkPosition();
        const main = document.querySelector('main') as HTMLBodyElement;
        document.title = 'Post';
        main.innerHTML = '';
        await PageController.setPost(id);
    }

    static async openPosts(id: number) {
        document.title = `${(await model.user.get(id)).username}'s posts`;
        await HeaderView.renderHeaderContainer();

        await PageController.userPosts(id);
    }

    static async openLogin() {
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
        document.title = `${(await model.user.get(id)).username}'s favorites`;
        await HeaderView.renderHeaderContainer();
        PageController.userFavorite(id);
    }

    static async openFeed() {
        const sessionValid = await checkSession();
        if (!sessionValid) {
            window.history.pushState({}, '', '/login');
            Router.handleLocation();
            return;
        }
        state.page = 1;
        document.title = 'Feed';
        await PageController.setHomePageController();

    }

    static async openRecommendation() {
        document.title = 'Recommendation';
        const sessionValid = await checkSession();
        if (!sessionValid) {
            window.history.pushState({}, '', '/login');
            Router.handleLocation();
            return;
        }
        await PageController.setHomePageController();
    }

    static async open404() {
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
