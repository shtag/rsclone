import model from '../../../api/Model';
import { CommentsLikeRequest, Post } from '../../../types/types';

import postElemens from './postElemensView';

// eslint-disable-next-line import/no-mutable-exports
// export let page = 1;
export const state = {
    page: 1
}

class PostElementsController {
    static async checkPosition() {
        window.addEventListener('scroll', async () => {
            if (window.location.href.indexOf('/feed') !== -1) {
                const height = document.body.offsetHeight;
                const screenHeight = window.innerHeight;
                const scrolled = window.scrollY;
                const threshold = height - screenHeight / 4;
                const position = scrolled + screenHeight;
                if (position >= threshold) {
                    state.page += 1;
                    await this.renderPosts(state.page);
                }
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
        posts.forEach(async (element: Post) => {
            await postElemens.renderPost(element);
        });
    }

    static async likeDislikePost(element: Event) {
        const sessionId = '$2b$10$NhL.XLXwthdA4kACTPIJg.';
        const container = document.querySelector('main') as HTMLElement;

        const el = element.target as HTMLElement;
        const target = el.closest('.like_btn') as HTMLElement;
        if (target) {
            const id = target.dataset.post_id;
            if (id) {
                const postId = Number(id);
                if (!Number.isNaN(postId)) {
                    const like = model.post.like(postId, sessionId);
                    const likesText = target.querySelector('.tools_text_likes') as HTMLElement;
                    likesText.innerText = String((await like).likes.length);
                }
            }
        }
    }

    static async comment(event: Event) {
        const sessionId = '$2b$10$NhL.XLXwthdA4kACTPIJg.';
        let isRequestInProgress = false;

        const target = (event.target as HTMLElement).closest('.imput_comment_btn') as HTMLElement;
        if (!target || isRequestInProgress) {
            return;
        }
        isRequestInProgress = true;
        const input = target.previousSibling?.previousSibling as HTMLInputElement;
        if (!input || !input.dataset.post_id) {
            isRequestInProgress = false;
            return;
        }
        const postId = Number(input.dataset.post_id);
        const text = input.value as string;
        const commentRequest = { sessionId, text };
        if (Number.isNaN(postId)) {
            isRequestInProgress = false;
            return;
        }
        try {
            if (localStorage.sessionId === undefined) return;
            const post = await model.comment.add(postId, commentRequest);
            const parrent = (event.target as HTMLElement).closest('.post_info_cotainer') as HTMLElement;
            const block = parrent.querySelector('.comment_container') as HTMLElement;
            const postContainer = (event.target as HTMLElement).closest('.comments_container') as HTMLElement;
            const toolsComment = postContainer.querySelector('.tools_text_comment') as HTMLElement;
            const user = await model.user.get(Number(localStorage.userId));
            let img: string;

            if (user.settings.photo === '') {
                img = 'https://i.postimg.cc/zBhxtTWj/base.jpg';
            } else {
                img = user.settings.photo;
            }
            const aaa = postElemens.renderComment(post.comments[post.comments.length - 1], postId, user.username, img);
            block.innerHTML += aaa;
            toolsComment.innerHTML = String(post.comments.length);
            input.value = '';
        } catch (error) {
            console.error(error);
        } finally {
            isRequestInProgress = false;
        }
    }

    static activeInput() {
        const container = document.querySelector('main') as HTMLElement;
        container.addEventListener('click', (element) => {
            const el = element.target as HTMLElement;
            const target = el.closest('.comment_btn') as HTMLElement;
            if (target) {
                const parent = target.parentNode;
                if (parent) {
                    const sibling = parent.previousSibling?.previousSibling as HTMLElement;
                    if (sibling) {
                        const input = sibling.querySelector('input') as HTMLInputElement;
                        input.focus();
                    }
                }
            }
        });
    }

    static reply() {
        const container = document.querySelector('main') as HTMLElement;
        container.addEventListener('click', (element) => {
            const el = element.target as HTMLElement;
            const target = el.closest('.comment_tools_reply') as HTMLElement;
            if (target) {
                const parent = target.parentNode;
                if (parent) {
                    const sibling = parent.previousSibling?.previousSibling as HTMLElement;
                    const getReplyUser = sibling.querySelector('b');
                    const text = getReplyUser?.innerHTML;
                    const getInputContainer = sibling.parentNode?.parentNode?.parentNode?.parentElement as HTMLElement;
                    const input = getInputContainer.querySelector('input') as HTMLInputElement;
                    input.value = `${text}, `;
                }
            }
        });
    }

    static likesToComment() {
        const sessionId = '$2b$10$NhL.XLXwthdA4kACTPIJg.';
        const container = document.querySelector('main') as HTMLElement;
        const click = container.addEventListener('click', async (event) => {
            if (localStorage.sessionId === undefined) return;
            const target = (event.target as HTMLElement).closest('.comment_like-btn') as HTMLElement;
            if (!target) {
                return;
            }

            const postIDString = target.dataset.postid;
            if (!postIDString) {
                return;
            }

            const postId = Number(postIDString);
            if (Number.isNaN(postId)) {
                return;
            }

            const commentIDString = target.dataset.commentid;
            const commentId = Number(commentIDString);
            if (Number.isNaN(commentId)) {
                return;
            }

            const likeRequest: CommentsLikeRequest = { sessionId, commentId };
            const likeData = await model.comment.like(postId, likeRequest);
            const parent = target.closest('.comment') as HTMLElement;
            const text = parent.querySelector('.comment_tools_like') as HTMLElement;
            const comment = likeData.comments.find((el) => el.id === commentId);
            if (!comment) {
                return;
            }

            const { length } = comment.likes;
            text.innerHTML = `${length} Likes`;
        });
    }
}

export { PostElementsController };
