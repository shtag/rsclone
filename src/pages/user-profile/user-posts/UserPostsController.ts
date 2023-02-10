import './style.scss';

import UserPostsView from './UserPostsView';
import { Post } from '../../../types/types';
import model from '../../../api/Model';

class UserPostsController {
    static setPostsInfo() {
        const userPosts = document.createElement('div');
        userPosts.classList.add('post__block');

        const userBlock = document.querySelector('.user');
        userBlock?.append(userPosts);
    }

    static clearGalleryChilds() {
        const userPosts = document.querySelector('.post__block');
        userPosts?.childNodes.forEach((image) => {
            image.remove();
        });
    }

    static async setPosts() {
        try {
            const userPosts = document.querySelector('.post__block');

            const results = await model.post.getUserPosts(1);

            results.forEach(async (el: Post) => {
                const img = UserPostsView.renderPostImg(el.image);
                userPosts?.insertAdjacentHTML('beforeend', img);
            });
        } catch (error) {
            UserPostsController.clearGalleryChilds();

            const p = `<p class="no-results">No results...Please try again</p>`;
            const userPosts = document.querySelector('.post__block');

            userPosts?.insertAdjacentHTML('afterbegin', p);
        }
    }

    static setTabSwitch() {
        const posts = document.querySelector('.user__post-item_posts') as HTMLElement;
        const favorites = document.querySelector('.user__post-item_favorites') as HTMLElement;
        const saved = document.querySelector('.user__post-item_saved') as HTMLElement;
        const dividerPart = document.querySelector('.divider__part') as HTMLElement;
        const userPostItem = document.querySelectorAll('.user__post-item') as NodeListOf<HTMLElement>;
        const userPosts = document.querySelector('.post__block');

        userPostItem.forEach((el) => {
            el.addEventListener('click', () => {
                const icon = el.children[1] as HTMLButtonElement;
                const text = el.children[0] as HTMLImageElement;

                userPostItem.forEach((item) => {
                    item.children[1].classList.remove('active');
                    item.children[0].classList.remove('active_icon');
                });

                icon.classList.add('active');

                text.classList.add('active_icon');
            });
        });

        posts?.addEventListener('click', () => {
            if (userPosts) {
                userPosts.innerHTML = '';
            }

            UserPostsController.setPosts();
            dividerPart.style.marginLeft = '7%';
        });

        favorites?.addEventListener('click', () => {
            if (userPosts) {
                userPosts.innerHTML = '';
            }

            dividerPart.style.marginLeft = '24.5%';
        });

        saved?.addEventListener('click', () => {
            if (userPosts) {
                userPosts.innerHTML = '';
            }

            dividerPart.style.marginLeft = '41.5%';
        });
    }
}

export default UserPostsController;
