import PageController from './pages/PageController';
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
        const res = await fetch('http://localhost:3000/users'); // использовать метод из модели
        const users: User[] = await res.json();
        const usersList = users.map((el) => el.username);

        const user = users.find((us) => us.username === path[1]);
        if (user && path.length === 2) {
            Router.openProfile(user.id);
        } else if (path[1] === 'feed' && path.length === 2) {
            Router.openFeed();
        } else if (path[1] === 'login' && path.length === 2) {
            Router.openLogin();
        } else if (path[1] === '' && path.length === 2) {
            console.log('main page');
        } else if (path[1] === 'p' && path.length === 3) {
            Router.openPost(+path[2]);
        } else {
            Router.open404();
        }
    }

    static async openProfile(id: number) {
        await PageController.setUserProfileController(id);
    }

    static async openPost(id: number) {
        await PageController.postPopup(id);

        await PageController.closePopup(id);
    }

    static async openLogin() {
        console.log('open login');
    }

    static async openFeed() {
        console.log('open feed');
        const main = document.querySelector('main') as HTMLBodyElement;
        main.innerHTML = '';
        main.innerHTML = `
        <div class="page_404">
            <h1>Тут будет фид</h1>
        </div>`;
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
            Router.handleLocation();
        });
    }
}

export default Router;
