import model from '../../../api/Model';
import Router from '../../../router';
import { checkSession } from '../../../types/functions';
import { CommentsLikeRequest, Post, State } from '../../../types/types';
import dictionary from '../../staticElements/dictionary';
import LoadersView from '../../staticElements/loaders/loadersView';

import postElemens from './postElemensView';

// eslint-disable-next-line import/no-mutable-exports
// export let page = 1;
export const state: State = {
    page: 1,
};

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
                    state.page += 1;
                    await this.renderFeeds(state.page);
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
            await this.renderPosts(posts);

        }

        if (window.location.href.indexOf('/recommendation') !== -1) {
            const posts = await model.post.recommendationFeed(params);
            await this.renderPosts(posts);
        }
    }

    static async renderPosts(posts: Post[]) {
        if (posts.length === 0) return;
        const main = document.querySelector('main') as HTMLElement;
        const dom = posts.map((element) => {
            const res = postElemens.renderPostElement(element);
            return res;
        })
        const ln = dictionary[localStorage.lang];
        const res = await Promise.all(dom).then(val => val.map(el => `<div class="comments_container">${el}</div>`))
        main.innerHTML += res.join('');
        const container = document.querySelectorAll('.post_info_cotainer') as NodeListOf<HTMLElement>;
        for (let i = 0; i < container.length; i += 1) {
            const form = container[i].querySelector('.comment_form_container') as HTMLFormElement;
            if (!form) {
                const input = container[i].querySelector('.comment_input') as HTMLInputElement;
                const btn = container[i].querySelector('.imput_comment_btn') as HTMLButtonElement;
                input.remove();
                btn.remove();
                container[i].innerHTML += `
                <form onsubmit="event.preventDefault();" data-post_id="${container[i].dataset.post_id}" class="comment_form_container">
                            <input maxlength="150"
                            data-post_id="${container[i].dataset.post_id}"
                            class="comment_input"
                            autocomplete="off"
                            type="text"
                            name="name"
                            placeholder="${ln.AddComment}"
                            size="30" required />
                            <button type="button" class="imput_comment_btn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 3L9.21802 10.083" stroke="#f9fdfe" stroke-width="2" stroke-linejoin="round"/>
                                    <path d="M11.698 20.334L22 3.001H2L9.218 10.084L11.698 20.334Z" stroke="#f9fdfe" stroke-width="2" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        <form>`
            }
        }


        // posts.forEach(async (element: Post) => {
        //     await postElemens.renderPost(element);
        // });
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
            if (!(await checkSession())) return;
            target.innerHTML = LoadersView.add();
            const post = await model.comment.add(postId, commentRequest);
            const parrent = target.closest('.post_info_cotainer') as HTMLElement;
            const block = parrent.querySelector('.comment_container') as HTMLElement;
            const postContainer = target.closest('.comments_container') as HTMLElement;
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
            setTimeout(() => {
                target.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 3L9.21802 10.083" stroke="#f9fdfe" stroke-width="2" stroke-linejoin="round"></path>
                <path d="M11.698 20.334L22 3.001H2L9.218 10.084L11.698 20.334Z" stroke="#f9fdfe" stroke-width="2" stroke-linejoin="round"></path>
                </svg>`
            }, 500);
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
                    const getReplyUser = sibling.querySelector('.user-text');
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

    static async delPost(element: Event) {
        const sessionId = localStorage.getItem('sessionId') as string;
        const el = element.target as HTMLElement;
        const target = el.closest('.delete_btn') as HTMLElement;
        const container = el.closest('.comments_container') as HTMLElement;
        if (target) {
            const id = target.dataset.post_id;
            if (id) {
                const postId = Number(id);
                if (!Number.isNaN(postId)) {
                    const popup = document.createElement('div');
                    popup.classList.add('popup');
                    const popupHtml = `
                            <div class="popup">
                            <div class="popup_content">
                                <p>Are you sure you want to delete this post?</p>
                                <div class="popup_buttons">
                                <button class="popup_button confirm_button">Yes</button>
                                <button class="popup_button cancel_button">No</button>
                                </div>
                            </div>
                            </div>
                        `;
                    const popupContainer = document.createElement('div');
                    popupContainer.innerHTML = popupHtml;
                    document.body.appendChild(popupContainer);

                    const confirmButton = popupContainer.querySelector('.confirm_button') as HTMLButtonElement;
                    const cancelButton = popupContainer.querySelector('.cancel_button') as HTMLButtonElement;

                    confirmButton.addEventListener('click', async () => {
                        const responce = await model.post.delete(postId, sessionId);
                        if (responce === true) {
                            if (window.location.href.indexOf(`/p/${postId}`) !== -1) {
                                Router.openProfile(localStorage.userId);
                            } else await container.remove();
                        }
                        popupContainer.remove();
                    });

                    cancelButton.addEventListener('click', () => {
                        popupContainer.remove();
                    });
                }
            }
        }
    }
}

export { PostElementsController };
