import model from '../../../api/Model';
import { CommentsLikeRequest, Post } from '../../../types/types';

import postElemens from './postElemensView';

// eslint-disable-next-line import/no-mutable-exports
export let page = 1;

class PostElementsController {
    static async checkPosition() {
        const main = document.querySelector('main') as HTMLBodyElement;
        main.innerHTML = '';
        window.addEventListener('scroll', async () => {
            if (window.location.href.indexOf('/feed') !== -1 || window.location.href.indexOf('/recommendation')) {
                const height = document.body.offsetHeight;
                const screenHeight = window.innerHeight;
                const scrolled = window.scrollY;
                const threshold = height - screenHeight / 4;
                const position = scrolled + screenHeight;
                if (position >= threshold) {
                    page += 1;
                    await this.renderFeeds(page);
                }
            }
        });
    }

    static async renderFeeds(pg: number) {
        const params = {
            sessionId: localStorage.getItem('sessionId') as string,
            limit: 10,
            page: pg,
        };
        if (window.location.href.indexOf('/feed') !== -1) {
            const posts = await model.post.feed(params);
            this.renderPosts(posts);
        }

        if (window.location.href.indexOf('/recommendation') !== -1) {
            const posts = await model.post.recommendationFeed(params);
            this.renderPosts(posts);
        }
    }

    static async renderPosts(posts: Post[]) {
        if (posts.length === 0) return;
        await posts.forEach((element: Post) => {
            postElemens.renderPost(element);
        });
    }

    static async likeDislikePost(element: Event) {
        const sessionId = localStorage.getItem('sessionId') as string;
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
        const sessionId = localStorage.getItem('sessionId') as string;
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
            block.innerHTML += postElemens.renderComment(post.comments[post.comments.length - 1], postId, user.username, img);
            toolsComment.innerHTML = String(post.comments.length);
            input.value = '';
        } catch (error) {
            console.error(error);
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
        const sessionId = localStorage.getItem('sessionId') as string;
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

    static async favorite(element: Event) {
        const sessionId = localStorage.getItem('sessionId') as string;
        const el = element.target as HTMLElement;
        const target = el.closest('.favorite_btn') as HTMLElement;
        if (target) {
            const id = target.dataset.post_id;
            if (id) {
                const postId = Number(id);
                if (!Number.isNaN(postId)) {
                    await model.post.addFavorites(postId, sessionId);
                    const svg = target.querySelector('path') as SVGPathElement;
                    if (svg.getAttribute('stroke') === 'darkorange') {
                        svg.setAttribute('stroke', 'white');
                    } else {
                        svg.setAttribute('stroke', 'darkorange');
                    }
                }
            }
        }
    }
}

export { PostElementsController };
