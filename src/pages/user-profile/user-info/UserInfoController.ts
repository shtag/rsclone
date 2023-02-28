import model from '../../../api/Model';
import dictionary from '../../staticElements/dictionary';
import UserPageView from './UserInfoView';

class UserPageController {
    static async setUserInfo(id: number) {
        const user = document.createElement('div');
        user.classList.add('user');

        const main = document.querySelector('main');
        main?.append(user);

        user.innerHTML = await UserPageView.renderUserInfo(id);
        const view = document.querySelector('.view') as HTMLImageElement;

        view?.addEventListener('click', () => {
            view.classList.toggle('active_icon');
            UserPageController.changeView();
        });
    }

    static changeView() {
        const postImg = document.querySelectorAll('.post__img') as NodeList;

        postImg.forEach((img) => {
            const image = img as HTMLImageElement;
            image.style.width = '100%';
            image.style.height = '465px';
        });
    }

    static async subscribeToUser(id: number) {
        const user = await model.user.get(id);
        const ln = dictionary[localStorage.lang];
        const currentSessionId = localStorage.getItem('sessionId') as string;
        await model.user.subscribe({ sessionId: currentSessionId, username: user.username });
        const currentUserId = localStorage.getItem('userId') as string;
        const subscribeBtn = document.querySelector('.subscribe__btn') as HTMLButtonElement;
        const followers = await model.user.getFollowers(id);
        const userCount = document.querySelector('.user__followers_quantity') as HTMLElement;
        userCount.innerHTML = followers.length.toString();
        if (followers.filter(us => us.id === +currentUserId).length > 0) {
            subscribeBtn.children[0].innerHTML = ln.Unsubscribe;
        } else {
            subscribeBtn.children[0].innerHTML = ln.Subscribe;
        }
    }
}

export default UserPageController;
