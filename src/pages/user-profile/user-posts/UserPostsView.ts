import './style.scss';

class UserPostsView {
    static renderPostImg(src: string) {
        return `
        <img class="post__img" src=${src} alt="image"/>
        `;
    }
}

export default UserPostsView;
