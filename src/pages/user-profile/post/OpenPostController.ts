import model from '../../../api/Model';
import postElemens from '../../home-page/postElements/postElemensView';
import OpenPostView from './OpenPostView';
import { sessionId } from '../../../types/constants';
import { state } from '../../home-page/postElements/postElementsController';

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
        if (localStorage.getItem('favorites') === 'true' && userName.id === +localStorage.getItem('userId')!) {
            route.href = `/${userName.username}/favorites`;
        } else if (localStorage.getItem('favorites') === 'false') {
            route.href = `/${userName.username}`;
        }

        const postBlock = document.querySelector('.open__post') as HTMLDivElement;
        postBlock.innerHTML = await postElemens.renderPostElement(post);
    }
}

export default OpenPostController;
