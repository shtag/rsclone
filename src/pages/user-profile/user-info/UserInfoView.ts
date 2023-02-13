import model from '../../../api/Model';
import './style.scss';

class UserPageView {
    static async renderUserInfo(id: number) {
        const user = await model.user.get(id);
        const followers = await model.user.getFollowers(id);
        const following = await model.user.getSubscriptions(id);
        const postQuantity = await model.post.getUserPosts(id);

        return ` 
        <div class="user__block">
          <div class="user__avatar-block">
            <div class="user__avatar_add"></div>
            <img class="user__avatar_img" src="${user.settings.photo}" alt="avatar" />
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
                  <p class="user__statistics_title">Posts</p>
                </div>
                <div class="user__divider"></div>
                <div class="user__statistics-block user__followers">
                  <p class="user__followers_quantity">${followers.length}</p>
                  <p class="user__statistics_title">Followers</p>
                </div>
                <div class="user__divider"></div>
                <div class="user__statistics-block user__following">
                  <p class="user__following_quantity">${following.length}</p>
                  <p class="user__statistics_title">Following</p>
                </div>
              </div>
            </div>
            <div class="user__description">
              ${user.settings.descriptionProfile}
            </div>
          </div>
        </div>
        <div class="divider">
          <div class="divider__part"></div>
        </div>
        
        <div class="user__post-block">
          <a class="route" href="/${user.username}/posts">
            <div class="user__post-item user__post-item_posts">
              <img class="user__post-item_icon active_icon" src='img/icons/posts-icon.svg' alt="posts" />
              <button class="user__post-item_text active">Posts</button>
            </div>
          </a>
          <a class="route" href="/${user.username}/favorites">
            <div class="user__post-item user__post-item_favorites">
              <img class="user__post-item_icon" src='img/icons/favorites-icon.svg' alt="posts" />
              <button class="user__post-item_text">Favorites</button>
            </div>
          </a>
          <a class="route" href="/${user.username}/saved">
            <div class="user__post-item user__post-item_saved">
              <img class="user__post-item_icon" src='img/icons/saved-icon.svg' alt="posts" />
              <button class="user__post-item_text">Saved</button>
            </div>
          </a>
        </div>
    
        `;
    }
}

export default UserPageView;
