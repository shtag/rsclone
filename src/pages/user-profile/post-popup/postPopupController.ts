import model from '../../../api/Model';
import { Post } from '../../../types/types';
import postElemens from '../../home-page/postElements/postElemensView';
import UserPostsController from '../user-posts/UserPostsController';
import PostPopupView from './postPopupView';

import './style.scss';

class PostPopupController {
    static async setPopup(postId: number) {
        const userPosts = document.createElement('div') as HTMLDivElement;
        userPosts.classList.add('post__popup');

        const route = document.createElement('a');
        route.className = 'route';
        route.href = '/shtag';

        const cross = document.createElement('img') as HTMLImageElement;
        cross.src = '../../../img/icons/close-icon.svg';
        cross.classList.add('post__popup_cross');

        route.append(cross);

        const post = await model.post.get(postId);

        userPosts.innerHTML = await postElemens.renderPostElement(post);
        userPosts.prepend(route);

        const background = document.createElement('div');
        background.classList.add('post__popup-background');

        const user = document.querySelector('.user');
        user?.append(userPosts);
        user?.append(background);
    }

    static async setPostPopup(postId: number) {
        await PostPopupController.setPopup(postId);

        const popup = document.querySelector('.post__popup') as HTMLElement;
        const bg = document.querySelector('.post__popup-background') as HTMLElement;
        const body = document.querySelector('body') as HTMLElement;

        popup?.classList.add('post__popup_open');
        bg?.classList.add('post__popup-background_visible');
        body.style.overflow = 'hidden';

        // const popupCross = document.querySelector('.post__popup > img') as HTMLElement;

        // popupCross?.addEventListener('click', () => {
        //     popup?.classList.remove('post__popup_open');
        //     bg?.classList.remove('post__popup-background_visible');
        //     body.style.overflow = 'visible';
        // });
    }

    static async closePostPopup(postId: number) {
        await PostPopupController.setPopup(postId);

        const popupCross = document.querySelector('.post__popup > img') as HTMLElement;

        const popup = document.querySelector('.post__popup') as HTMLElement;
        const bg = document.querySelector('.post__popup-background') as HTMLElement;
        const body = document.querySelector('body') as HTMLElement;

        popupCross?.addEventListener('click', () => {
            popup?.classList.remove('post__popup_open');
            bg?.classList.remove('post__popup-background_visible');
            body.style.overflow = 'visible';
        });
    }
}

export default PostPopupController;
