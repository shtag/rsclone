import './style.scss';
import UserPostsModel from './UserPostsModel';

class UserPostsController {
    static setUserInfo() {
        const userPosts = document.createElement('div');
        userPosts.classList.add('post__block');

        const main = document.querySelector('main');

        const container = document.createElement('div');
        container.classList.add('container');
        main?.append(container);
        container?.append(userPosts);
    }

    static clearGalleryChilds() {
        const userPosts = document.querySelector('.post__block');
        userPosts?.childNodes.forEach((image) => {
            image.remove();
        });
    }

    static async getData(url: string) {
        try {
            const userPosts = document.querySelector('.post__block');

            if (userPosts) {
                userPosts.innerHTML = 'Loading...';
            }

            const results = await UserPostsModel.getUserPosts(url);

            UserPostsController.clearGalleryChilds();

            if (results.length) {
                results.forEach((element: { urls: { regular: string } }) => {
                    const img = `<img class="post__img" src=${element.urls.regular} alt="image">`;
                    userPosts?.insertAdjacentHTML('beforeend', img);
                });
            } else {
                throw new Error();
            }
        } catch {
            UserPostsController.clearGalleryChilds();

            const p = `<p class="no-results">No results...Please try again</p>`;
            const userPosts = document.querySelector('.post__block');

            userPosts?.insertAdjacentHTML('afterbegin', p);
        }
    }
}

export default UserPostsController;
