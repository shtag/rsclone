import model from '../../../api/Model';
import { Post } from '../../../types/types';
import UserFavView from './UserFavView';

class UserFavController {
    static setFavPostsInfo() {
        const favPosts = document.createElement('div');
        favPosts.classList.add('post__block');

        const userBlock = document.querySelector('main');
        userBlock?.append(favPosts);
    }

    static async setFavPosts(id: number) {
        const userPosts = document.querySelector('.post__block') as HTMLDivElement;
        const favorites = document.querySelector('.user__post-item_favorites') as HTMLDivElement;
        const dividerPart = document.querySelector('.divider__part') as HTMLDivElement;
        const posts = document.querySelector('.user__post-item_posts') as HTMLDivElement;
        const icon = favorites.children[1] as HTMLButtonElement;
        const text = favorites.children[0] as HTMLImageElement;
        const iconPosts = posts.children[1] as HTMLButtonElement;
        const textPosts = posts.children[0] as HTMLImageElement;

        const results = await model.post.getFavorites(id);
        results.forEach(async (el: Post) => {
            const img = UserFavView.renderFavPostImg(el.id, el.image);
            userPosts?.insertAdjacentHTML('beforeend', img);
        });

        icon.classList.add('active');
        text.classList.add('active_icon');
        dividerPart.style.marginLeft = '24.5%';
        iconPosts.classList.remove('active');
        textPosts.classList.remove('active_icon');
    }
}

export default UserFavController;
