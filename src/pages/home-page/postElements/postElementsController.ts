import model from '../../../api/Model';
import { CommentRequest, CommentsLikeRequest, Post } from '../../../types/types';

import postElemens from './postElemensView';

// eslint-disable-next-line import/no-mutable-exports
export let page = 1;

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
                    page += 1;
                    await this.renderPosts(page);
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
        let isRequestInProgress = false;
    
        container.addEventListener('click', async (event) => {
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
                const post = await model.comment.add(postId, commentRequest);
                const parrent = (event.target as HTMLElement).closest('.post_info_cotainer') as HTMLElement;
                const block = parrent.querySelector('.comment_container') as HTMLElement;
                block.innerHTML += postElemens.renderComment(post.comments[post.comments.length - 1], postId);
                input.value = '';
            } catch (error) {
                console.error(error);
            } finally {
                isRequestInProgress = false;
            }
        });
    }
    

    static likesToComment() {
        const sessionId = '$2b$10$NhL.XLXwthdA4kACTPIJg.';
        const container = document.querySelector('main') as HTMLElement;
        container.addEventListener('click', async (event) => {
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
          const comment = likeData.comments.find(el => el.id === commentId);
          if (!comment) {
            return;
          }
      
          const { length } = comment.likes;
          text.innerHTML = `${length} Likes`;
        });
      }
      
}

export { PostElementsController };
