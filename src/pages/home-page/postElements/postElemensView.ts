import model from '../../../api/Model';
import { checkSession } from '../../../types/functions';
import { Post, Comment, User } from '../../../types/types';
import dictionary from '../../staticElements/dictionary';
import svg from '../../staticElements/svg';

export class postElemens {
    static async renderPost(PostData: Post) {
        const main = document.querySelector('main') as HTMLElement;
        const root = document.createElement('div') as HTMLDivElement;
        root.className = 'comments_container';
        const HTMLPost = await postElemens.renderPostElement(PostData);
        root.innerHTML = HTMLPost;
        main.append(root);
        const tools = document.querySelector('.tools') as HTMLDivElement;
        if (localStorage.sessionId === undefined) {
            tools.remove();
        }
    }

    static async renderPostElement(PostData: Post) {
        const userName = await model.user.get(PostData.author);
        let img;
        if (userName.settings.photo === '') {
            img = 'https://i.postimg.cc/zBhxtTWj/base.jpg';
        } else {
            img = userName.settings.photo;
        }
        const dateInMs = PostData.date;
        const date = new Date(dateInMs);
        const dateToPost = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        let color = "#f9fdfe";
        if (await checkSession()) {
            const user = await model.user.get(Number(localStorage.getItem('userId')));
            if (user.favorites.includes(PostData.id)) {
                color = "darkorange"
            }
        }
        let deleteBtn = ''
        if (await checkSession()) {
            const user = await model.user.get(localStorage.userId);
            if (user.id === PostData.author) {
                deleteBtn = `<div data-post_id="${PostData.id}" class="tools_container_item delete_btn" >${svg.delete}</div>`
            }
        }
        const ln = dictionary[localStorage.lang];

        return `
        <div class="post_wrapper">
            <div class="post">
                <div class="post_info_cotainer">
                    <div class="post_info_account">
                        <a class="post_info_account_img route" href="/${userName.username}">
                            <img class="mini-round-img" src="${img}" alt="" />
                        </a>
                        <a class="post_info_account_text route" href="/${userName.username}">
                            <p class="nickname">${userName.username}</p>
                        </a>
                    </div>
                    <div class="post_info_description">
                        <p class="post_info_description_text"><a href="/${userName.username}" class="route">${userName.username}</a> ${PostData.description}</p>
                        <div class="comment_container" data-post_id="${PostData.id}">${await postElemens.renderBlockWithComment(
            PostData
        )}</div>
                    </div>
                    <form onsubmit="event.preventDefault();" data-post_id="${PostData.id}" class="comment_form_container">
                <input maxlength="150"
                data-post_id="${PostData.id}"
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
            <form>
                </div>
                <div class="post_img_container">
                <img src=${PostData.image} alt="" class="post_img" />
                <p class="post_date">${dateToPost}</p>
                </div>
            </div>
            
        </div>
        <div class="tools">
                <div class="tools_container_item like_btn" data-post_id = "${PostData.id}">
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.792 2.904C18.1064 2.97667 19.3389 3.56591 20.2207 4.54331C21.1026 5.52071 21.5624 6.80705 21.5 8.122C21.5 11.194 18.848 13.081 16.303 15.344C13.791 17.587 12.438 18.813 12 19.096C11.523 18.787 9.85698 17.273 7.69698 15.344C5.14098 13.072 2.49998 11.167 2.49998 8.122C2.43755 6.80705 2.89737 5.52071 3.77924 4.54331C4.66111 3.56591 5.89355 2.97667 7.20798 2.904C7.93613 2.88193 8.65754 3.04919 9.30169 3.3894C9.94585 3.72962 10.4907 4.23117 10.883 4.845C11.723 6.02 11.863 6.608 12.003 6.608C12.143 6.608 12.281 6.02 13.113 4.842C13.503 4.22533 14.0481 3.7218 14.6937 3.38172C15.3393 3.04164 16.0628 2.87691 16.792 2.904ZM16.792 0.904003C15.8839 0.87493 14.981 1.05109 14.1504 1.41935C13.3199 1.78762 12.5831 2.33851 11.995 3.031C11.4074 2.34053 10.6721 1.79091 9.84353 1.42276C9.01496 1.0546 8.11427 0.877316 7.20798 0.904003C5.36285 0.976155 3.62136 1.77599 2.36432 3.1286C1.10728 4.48121 0.436977 6.27654 0.499982 8.122C0.499982 11.732 3.04998 13.949 5.51498 16.092C5.79798 16.338 6.08398 16.586 6.36798 16.839L7.39498 17.757C8.51502 18.8228 9.68925 19.8301 10.913 20.775C11.2368 20.9846 11.6143 21.0962 12 21.0962C12.3857 21.0962 12.7632 20.9846 13.087 20.775C14.3497 19.8013 15.56 18.7615 16.713 17.66L17.635 16.836C17.928 16.576 18.225 16.317 18.52 16.062C20.854 14.037 23.5 11.742 23.5 8.122C23.563 6.27654 22.8927 4.48121 21.6356 3.1286C20.3786 1.77599 18.6371 0.976155 16.792 0.904003Z"
                            fill="#f9fdfe"
                        />
                    </svg>
                    <p class="tools_text_likes">${PostData.likes.length}</p>
                </div>
                <div class="tools_container_item favorite_btn" data-post_id = "${PostData.id}">
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 19L9 11.44L1 19V1H17V19Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                ${deleteBtn}
                <div class="tools_container_item comment_btn" data-post_id = "${PostData.id}">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.656 16.008C20.8711 13.9061 21.2795 11.4337 20.8048 9.05272C20.3301 6.67172 19.0048 4.54497 17.0765 3.06978C15.1482 1.59458 12.7488 0.871855 10.3266 1.0366C7.9043 1.20135 5.62486 2.24231 3.91408 3.96501C2.20329 5.68772 1.17817 7.97432 1.03024 10.3977C0.882302 12.821 1.62166 15.2153 3.1102 17.1334C4.59874 19.0514 6.73463 20.3619 9.11887 20.82C11.5031 21.2782 13.9726 20.8527 16.066 19.623L21 21L19.656 16.008Z"
                            stroke="#f9fdfe"
                            stroke-width="2"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <p class="tools_text_comment">${PostData.comments.length}</p>
                </div>
            </div>
        `;
    }

    static async renderBlockWithComment(PostData: Post) {
        const users = await model.user.getAll()
        const HTMLComment = PostData.comments.map((comment) => {
            const user = users.find(us => us.id === comment.author) as User;
            return postElemens.renderComment(comment, PostData.id, user.username, user.settings.photo);
        })
        return HTMLComment.join('');
    }

    static renderComment(comment: Comment, postId: number, user: string, img: string) {
        const dateInMs = comment.date;
        const date = new Date(dateInMs);
        const dateToPost = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const ln = dictionary[localStorage.lang];
        return `
            <div class="comment">
                <div class="post_info_comment">
                <div class="post_info">
                    <a class="comment_img route" href="/${user}">
                        <img src="${img}" alt="" class="comment_mini_img" />
                    </a>
                    <div class="comment_text">
                        <p><a href="/${user}" class="route user-text">${user}</a>      ${comment.text}</p>
                    </div>
                </div>
                    <button class="comment_like-btn" data-postID="${postId}" data-commentID="${comment.id}">
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.792 2.904C18.1064 2.97667 19.3389 3.56591 20.2207 4.54331C21.1026 5.52071 21.5624 6.80705 21.5 8.122C21.5 11.194 18.848 13.081 16.303 15.344C13.791 17.587 12.438 18.813 12 19.096C11.523 18.787 9.85698 17.273 7.69698 15.344C5.14098 13.072 2.49998 11.167 2.49998 8.122C2.43755 6.80705 2.89737 5.52071 3.77924 4.54331C4.66111 3.56591 5.89355 2.97667 7.20798 2.904C7.93613 2.88193 8.65754 3.04919 9.30169 3.3894C9.94585 3.72962 10.4907 4.23117 10.883 4.845C11.723 6.02 11.863 6.608 12.003 6.608C12.143 6.608 12.281 6.02 13.113 4.842C13.503 4.22533 14.0481 3.7218 14.6937 3.38172C15.3393 3.04164 16.0628 2.87691 16.792 2.904ZM16.792 0.904003C15.8839 0.87493 14.981 1.05109 14.1504 1.41935C13.3199 1.78762 12.5831 2.33851 11.995 3.031C11.4074 2.34053 10.6721 1.79091 9.84353 1.42276C9.01496 1.0546 8.11427 0.877316 7.20798 0.904003C5.36285 0.976155 3.62136 1.77599 2.36432 3.1286C1.10728 4.48121 0.436977 6.27654 0.499982 8.122C0.499982 11.732 3.04998 13.949 5.51498 16.092C5.79798 16.338 6.08398 16.586 6.36798 16.839L7.39498 17.757C8.51502 18.8228 9.68925 19.8301 10.913 20.775C11.2368 20.9846 11.6143 21.0962 12 21.0962C12.3857 21.0962 12.7632 20.9846 13.087 20.775C14.3497 19.8013 15.56 18.7615 16.713 17.66L17.635 16.836C17.928 16.576 18.225 16.317 18.52 16.062C20.854 14.037 23.5 11.742 23.5 8.122C23.563 6.27654 22.8927 4.48121 21.6356 3.1286C20.3786 1.77599 18.6371 0.976155 16.792 0.904003Z"
                        fill="#f9fdfe"
                    />
                </svg>
                    </button>
                </div>
                <div class="comment_tools">
                    <p class="comment_tools_time">${dateToPost}</p>
                    <p class="comment_tools_like">${comment.likes.length} ${ln.likes}</p>
                    <button class="comment_tools_reply">${ln.reply}</button>
                </div>
            </div>
            `;
    }

}

export default postElemens;
