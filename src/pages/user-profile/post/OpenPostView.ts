import model from '../../../api/Model';

import './style.scss';

class OpenPostView {
    static async renderPost(postId: number) {
        const post = await model.post.get(postId);
        const userName = await model.user.get(post.author);

        return `
        <div class="open__post-settings">
        <a class="route" href="/${userName.username}"><button class="open__post-btn"><div class="text_button">Go back</div></button></a>
        <img class="open__post-fav" src="/img/icons/favorite-post-icon.svg"/>
        </div>
        <div class="open__post"></div>
        `;
    }
}

export default OpenPostView;
