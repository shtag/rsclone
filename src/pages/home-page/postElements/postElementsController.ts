import model from '../../../api/Model';
import { Post } from '../../../types/types';

import postElemens from './postElemensView';

// eslint-disable-next-line import/no-mutable-exports
export let page = 1;

class PostElementsController {
    static async checkPosition() {
        
           
        window.addEventListener('scroll', async () => {
            const height = document.body.offsetHeight;
            const screenHeight = window.innerHeight;
            const scrolled = window.scrollY;
            const threshold = height - screenHeight / 4;
            const position = scrolled + screenHeight;
            if (position >= threshold) {
                 page += 1;
                await this.renderPosts(page);
                
            }
        });
    }


    static async renderPosts(pg: number) {
        const params = {
            sessionId: '$2b$10$NhL.XLXwthdA4kACTPIJg.',
            limit: 10,
            page: pg,
        };
        const posts = await model.post.feed(params);
        if (posts.length === 0) return
        await posts.forEach((element: Post) => {
            postElemens.renderPostElement(element);
        });

    }

    // static likeToComment() {
    //     const btn = document.querySelector('.comment_like-btn');
    //     const postID = btn.dataset.postid;
    //     const commentID = btn.dataset.commentid;
    //     //Добавить по клику
    //     PostsElementsModel.likeDislikePost(commentID, UserId)
    // }
}

export {PostElementsController};
