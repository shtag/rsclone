import PageController from './pages/PageController';
import GeneralUserController from './pages/user-profile/UserProfileController';
import HomePageController from './pages/home-page/HomePageController';
import ModelPosts from './api/Model-components/Model-posts';
import './scss/styles.scss';
import './pages/home-page/staticElements/style.scss';
import './pages/home-page/postElements/style.scss'
import ModelUsers from './api/Model-components/Model-users';


class App {
    userPage: GeneralUserController;

    PageController: PageController;

    HomePageController: HomePageController;

    constructor() {
        this.userPage = new GeneralUserController();
        this.PageController = new PageController();
        this.HomePageController = new HomePageController();
    }

    static async start() {
        PageController.renderStructure();
        PageController.setControllers();

        const a = await ModelPosts.getAllPosts();
        const b = await ModelPosts.getUserPost(1);

        const d = await ModelUsers.getAllUsers();

        // const c = await ModelPosts.createPost('asfasfas', 'www.cat.com', 'This is a cat...');
        console.log(a);
        console.log(b);
        console.log(d)
        // console.log(c);

        console.log('start');

        const btn = document.querySelector('.profile-btn');
        btn?.addEventListener('click', () => {
            PageController.setUserProfileController();
        });
    }
}

const app = new App();
App.start();
