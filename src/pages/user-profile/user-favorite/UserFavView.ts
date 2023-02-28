import './style.scss';

class UserFavView {
    static renderFavPostImg(id: number, src: string) {
        return `
        <a class="route" href="/p/${id}"><img class="post__img" src=${src} alt="image"/></a>
        `;
    }
}

export default UserFavView;
