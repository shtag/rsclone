import model from '../../../api/Model';
import dictionary from '../../staticElements/dictionary';

import './style.scss';

class OpenPostView {
    static async renderPost(postId: number) {
        const post = await model.post.get(postId);
        const userName = await model.user.get(post.author);
        const ln = dictionary[localStorage.lang];

        return `
        <div class="open__post-settings">
        <a class="route" href="/${userName.username}"><button class="open__post-btn"><div class="text_button">${ln.GoBack}</div></button></a>
        </div>
        <div class="open__post comments_container"></div>
        `;
    }
}

export default OpenPostView;
