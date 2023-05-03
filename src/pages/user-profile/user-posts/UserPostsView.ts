import './style.scss';

class UserPostsView {
    static renderPostImg(id: number, src: string) {
        return `
        <a class="route" href="/p/${id}"><img class="post__img" src=${src} alt="image"/></a>
        `;
    }
}

export default UserPostsView;
