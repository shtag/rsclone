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

    static async setPosts(id: number) {
        try {
            const userPosts = document.querySelector('.post__block');
            const results = await model.post.getUserPosts(id);

            results.forEach(async (el: Post) => {
                const img = UserPostsView.renderPostImg(el.id, el.image);
                userPosts?.insertAdjacentHTML('beforeend', img);
            });
            UserPostsController.setTabSwitch();
        } catch (error) {
            UserPostsController.clearGalleryChilds();

            const p = `<p class="no-results">No results...Please try again</p>`;
            const userPosts = document.querySelector('.post__block');

            userPosts?.insertAdjacentHTML('afterbegin', p);
        }
    }

    static setTabSwitch() {
        const posts = document.querySelector('.user__post-item_posts') as HTMLElement;
        const dividerPart = document.querySelector('.divider__part') as HTMLElement;

        const icon = posts.children[1] as HTMLButtonElement;
        const text = posts.children[0] as HTMLImageElement;

        icon.classList.add('active');

        text.classList.add('active_icon');

        dividerPart.style.marginLeft = '7%';
    }
}

export default UserPostsController;
