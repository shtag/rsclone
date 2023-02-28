import model from '../../../api/Model';
import { checkSession } from '../../../types/functions';
import { state } from '../../home-page/postElements/postElementsController';
import dictionary from '../../staticElements/dictionary';
import './style.scss';

class UserPageView {
    static async renderUserInfo(id: number) {
        const user = await model.user.get(id);
        const followers = await model.user.getFollowers(id);
        const following = await model.user.getSubscriptions(id);
        const postQuantity = await model.post.getUserPosts(id);
        const ln = dictionary[localStorage.lang];

        let subButton = `
        <button class="subscribe__btn open__post-btn">
            <div class="text_button">${ln.Subscribe}</div>
        </button>`
        if (state.user) {
            if (state.user.subscriptions.includes(user.id)) {
                subButton = `
                <button class="subscribe__btn open__post-btn">
                    <div class="text_button">${ln.Subscribe}</div>
                </button>`
            }
        }
        if (user.id === +localStorage.userId || !await checkSession()) {
            subButton = `
            <button class="subscribe__btn open__post-btn display_none">
                <div class="text_button">${ln.Unsubscribe}</div>
            </button>`;
        }

        let img;

        if (user.settings.photo === '') {
            img = '../../../img/base.jpg';
        } else {
            img = user.settings.photo;
        }

        return ` 
        <div class="user__block">
            <div class="user__avatar-block">
                <img src="/img/add-photo.png" class="user__photo"/>
                    <img class="user__avatar_img" src="${img}" alt="avatar" />
                </div>
                <div class="user__infoStat">
                    <div class="user__info">
                        <div class="user__name">
                            <p class="user__name_title">${user.settings.name}</p>
                            <p class="user__name_nickname">@${user.username}</p>
                        </div>
                        <div class="user__statistics">
                            <div class="user__statistics-block">
                                <p class="user__posts_quantity">${postQuantity.length}</p>
                                <p class="user__statistics_title">${ln.Posts}</p>
                        </div>
                        <div class="user__divider"></div>
                            <div class="user__statistics-block user__followers">
                                <p class="user__followers_quantity">${followers.length}</p>
                                <p class="user__statistics_title">${ln.Followers}</p>
                            </div>
                            <div class="user__divider"></div>
                            <div class="user__statistics-block user__following">
                            <p class="user__following_quantity">${following.length}</p>
                            <p class="user__statistics_title">${ln.Following}</p>
                            </div>
                        </div>
                    </div>
                    <div class="user__description-block">
                        <div class="user__description">
                        ${user.settings.descriptionProfile}
                        </div>
                            ${subButton}
                        </div>
                    </div>
                </div>
            <div class="divider">
            <div class="divider__part"></div>
            </div>  
        <div class="user__post-block">
          <a class="route" href="/${user.username}/posts">
            <div class="user__post-item user__post-item_posts">
              <img class="user__post-item_icon active_icon" src='/img/icons/posts-icon.svg' alt="posts" />
              <button class="user__post-item_text active">${ln.Posts}</button>
            </div>
          </a>
          <a class="route" href="/${user.username}/favorites">
            <div class="user__post-item user__post-item_favorites">
              <img class="user__post-item_icon" src='/img/icons/favorites-icon.svg' alt="favorites" />
              <button class="user__post-item_text">${ln.Favorites}</button>
            </div>
          </a>
        </div>
        `;
    }
}

export default UserPageView;
