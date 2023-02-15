import model from '../../../api/Model';
import postElemens from '../../home-page/postElements/postElemensView';
import { PostElementsController } from '../../home-page/postElements/postElementsController';
import OpenPostView from './OpenPostView';
import { sessionId } from '../../../types/constants';

class OpenPostController {
    static async setPost(postId: number) {
        const post = await model.post.get(postId);
        const userName = await model.user.get(post.author);

        const goBack = document.createElement('div');
        goBack.classList.add('open__post-block');

        const main = document.querySelector('main');
        main?.append(goBack);

        goBack.innerHTML = await OpenPostView.renderPost(postId);

        const route = goBack.querySelector('.route') as HTMLAnchorElement;

        if (localStorage.getItem('favorites') === 'true') {
            route.href = `/${userName.username}/favorites`;
        } else if (localStorage.getItem('favorites') === 'false') {
            route.href = `/${userName.username}`;
        }

        const postBlock = document.querySelector('.open__post') as HTMLDivElement;
        postBlock.innerHTML = await postElemens.renderPostElement(post);
        PostElementsController.likeDislikePost();
        PostElementsController.comment();
        OpenPostController.setFav(postId)
    }

    static setFav(postId: number) {
        const favIcon = document.querySelector('.open__post-fav') as HTMLImageElement;

        favIcon.addEventListener('click', async () => {
            favIcon.src = '/img/icons/favorite-post-icon-add.svg';
            await model.post.addFavorites(postId, sessionId);
        });
    }
}

export default OpenPostController;
