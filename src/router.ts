interface IUser {
    username: string;
    id: number;
} // удалить после мержа всех веток и добавить тип

class Router{

    static route(event: Event) {
        const e = event || window.event;
        const target = (e.target as HTMLAnchorElement).closest('.route') as HTMLAnchorElement;
        e.preventDefault();
        window.history.pushState({}, '', (e.target as HTMLAnchorElement).href || target.href);
        Router.handleLocation();
    }

    static async handleLocation() {
        const path: string[] = window.location.pathname.split('/');
        const res = await fetch('http://localhost:3000/users') // использовать метод из модели
        const users: IUser[] = await res.json();
        const usersList = users.map((el) => el.username);
        
        const user = users.find((us) => us.username === path[1]);
        if (user && path.length === 2) {
            Router.openProfile(user.id);
        } else if (path[1] === 'feed' && path.length === 2) {
            Router.openFeed();
        } else if (path[1] === 'login' && path.length === 2) {
            Router.openLogin();
        } else if (path[1] === '' && path.length === 2) {
            console.log('main page')
        } else if (path[1] === 'p' && path.length === 3) {
            Router.openPost(+path[2])
        } else {
            Router.open404();
        }
    }

    static async openProfile(id: number){
        console.log("open profile")

    }

    static async openPost(id: number){
        console.log("open post")
    }

    static async openLogin(){
        console.log("open login")
    }

    static async openFeed(){
        console.log("open feed")
    }

    static async open404(){
        console.log("open 404");
        const body = document.querySelector('body') as HTMLBodyElement;
        body.innerHTML = '';
        body.innerHTML = `
        <div class="page_404">
            <h1>This page not exist!</h1>
            <a href="/feed" class="route">Go to home page</a>
        </div>`
    }

    static setEventListeners(){
        const body = document.querySelector('body') as HTMLElement;
        body.addEventListener('click', (e) => {
            const target = (e.target as HTMLElement).closest('.route');
            if(target) {
                Router.route(e);
            }
        })
        window.addEventListener('load', async () => {
           Router.handleLocation();
        })
    }
}


export default Router;