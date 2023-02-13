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
        if (posts.length === 0) return;
        await posts.forEach((element: Post) => {
            postElemens.renderPost(element);
        });
    }

    static likeDislikePost() {
        const sessionId = '$2b$10$NhL.XLXwthdA4kACTPIJg.';
        const container = document.querySelector('main') as HTMLElement;
        container.addEventListener('click', (element) => {
            const el = element.target as HTMLElement;
            const target = el.closest('.tools_container_item') as HTMLElement;
            if (target) {
                const id = target.dataset.post_id;
                if (id) {
                    const postId = Number(id);
                    if (!Number.isNaN(postId)) {
                        model.post.like(postId, sessionId);
                    }
                }
            }
        });
    }

    static comment() {
        const sessionId = '$2b$10$NhL.XLXwthdA4kACTPIJg.';
        const container = document.querySelector('main') as HTMLElement;
        container.addEventListener('click', async (event) => {
            const target = (event.target as HTMLElement).closest('.imput_comment_btn') as HTMLElement;
            if (!target) {
                return;
            }
            const input = target.previousSibling?.previousSibling as HTMLInputElement;
            if (!input || !input.dataset.post_id) {
                return;
            }
            const postId = Number(input.dataset.post_id);
            const text = input.value as string;
            const commentRequest = { sessionId, text };
            if (Number.isNaN(postId)) {
                return;
            }
            const post = await model.comment.add(postId, commentRequest);
            const parrent = (event.target as HTMLElement).closest('.post_info_cotainer') as HTMLElement;
            const block = parrent.querySelector('.comment_container') as HTMLElement;
            block.innerHTML += postElemens.renderComment(post.comments[post.comments.length - 1], postId);
        });
    }
}

export { PostElementsController };
