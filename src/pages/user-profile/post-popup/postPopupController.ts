import model from '../../../api/Model';
import postElemens from '../../home-page/postElements/postElemensView';

import './style.scss';

class PostPopupController {
    static async setPopup(postId: number) {
        const post = await model.post.get(postId);
        const userName = await model.user.get(post.author);

        const userPosts = document.createElement('div') as HTMLDivElement;
        const route = document.createElement('a') as HTMLAnchorElement;
        const cross = document.createElement('img') as HTMLImageElement;
        const favorites = document.createElement('img') as HTMLImageElement;
        const background = document.createElement('div') as HTMLDivElement;
        const crossBlock = document.createElement('div') as HTMLDivElement;

        userPosts.classList.add('post__popup');
        route.className = 'route';
        cross.classList.add('post__popup_cross');
        favorites.classList.add('post__popup_favorites');
        background.classList.add('post__popup-background');
        crossBlock.classList.add('cross__block');

        route.href = `/${userName.username}`;
        cross.src = '../../../img/icons/close-icon.svg';
        favorites.src = '../../../img/icons/favorite-popup-add.svg';

        userPosts.innerHTML = await postElemens.renderPostElement(post);
        route.append(cross);
        crossBlock.append(favorites, route);
        userPosts.prepend(crossBlock);

        const user = document.querySelector('.user');
        user?.append(userPosts);
        user?.append(background);
    }

    static async setPostPopup(postId: number) {
        await PostPopupController.setPopup(postId);

        const popup = document.querySelector('.post__popup') as HTMLElement;
        const bg = document.querySelector('.post__popup-background') as HTMLElement;
        const body = document.querySelector('body') as HTMLBodyElement;

        popup?.classList.add('post__popup_open');
        bg?.classList.add('post__popup-background_visible');
        body.style.overflow = 'hidden';

        const popupCross = document.querySelector('.post__popup_cross') as HTMLElement;
        const popupFavorites = document.querySelector('.post__popup_favorites') as HTMLImageElement;

        popupFavorites?.addEventListener('click', () => {
            popupFavorites.src = '../../../img/icons/favorite-popup.svg';
        });

        popupCross?.addEventListener('click', () => {
            popup?.classList.remove('post__popup_open');
            bg?.classList.remove('post__popup-background_visible');
            body.style.overflow = 'visible';
        });
    }
}

export default PostPopupController;
