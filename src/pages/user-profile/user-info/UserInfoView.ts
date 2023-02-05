import './style.scss';

class UserPageView {
    static renderUserInfo() {
        return ` 
        <div class="user">
        <div class="user__block">
          <div class="user__avatar-block">
            <div class="user__avatar_add"></div>
            <img class="user__avatar_img" src="img/cat.webp" alt="avatar" />
          </div>
          <div class="user__infoStat">
            <div class="user__info">
              <div class="user__name">
                <p class="user__name_title">Kierra Dokidis</p>
                <p class="user__name_nickname">@kierr1</p>
              </div>
              <div class="user__statistics">
                <div class="user__statistics-block">
                  <p class="user__posts_quantity">274</p>
                  <p class="user__statistics_title">Posts</p>
                </div>
                <div class="user__divider"></div>
                <div class="user__statistics-block user__followers">
                  <p class="user__followers_quantity">14.7M</p>
                  <p class="user__statistics_title">Followers</p>
                </div>
                <div class="user__divider"></div>
                <div class="user__statistics-block user__following">
                  <p class="user__following_quantity">10.5K</p>
                  <p class="user__statistics_title">Following</p>
                </div>
              </div>
            </div>
            <div class="user__description">
              Remember, you're the artist, not the canvas.
            </div>
          </div>
        </div>
        <div class="divider">
          <div class="divider__part"></div>
        </div>
      
        <div class="user__post-block">
          <div class="user__post-item">
            <img src='img/posts.svg' alt="posts" />
            <p>Posts</p>
          </div>
        </div>
      </div>
        `;
    }
}

export default UserPageView;
