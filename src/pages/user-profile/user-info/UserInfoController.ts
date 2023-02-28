import model from '../../../api/Model';
import { state } from '../../home-page/postElements/postElementsController';
import dictionary from '../../staticElements/dictionary';
import GeneralUserController from '../UserProfileController';
import UserPageView from './UserInfoView';

class UserPageController {
    static async setUserInfo(id: number) {
        const user = document.createElement('div');
        user.classList.add('user');

        const main = document.querySelector('main');
        main?.append(user);

        user.innerHTML = await UserPageView.renderUserInfo(id);
        // if (state.sessionValid) {
        //     await UserPageController.subscribe(id);
        // }
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

    static async subscribe(id: number) {
        const subscribeBtn = document.querySelector('.subscribe__btn') as HTMLButtonElement;
        const followersQuantity = document.querySelector('.user__followers_quantity') as HTMLParagraphElement;
        const currentSessionId = localStorage.getItem('sessionId') as string;
        const currentUserId = localStorage.getItem('userId') as string;

        const userSubscriptions = await model.user.getSubscriptions(+currentUserId);
        const ids = userSubscriptions.map((usersId) => usersId.id);

        const isSubscribed = !!ids.includes(id);
        localStorage.setItem('subscribed', isSubscribed.toString());

        const session = await GeneralUserController.checkSession(currentSessionId, id);
        subscribeBtn.style.display = !session.equal ? 'block' : 'none';
        const username = session.username as string;

        subscribeBtn.addEventListener('click', async () => {
            const subscribed = localStorage.getItem('subscribed') === 'true';
            subscribeBtn.children[0].innerHTML = subscribed ? 'Subscribe' : 'Unsubscribe';
            localStorage.setItem('subscribed', (!subscribed).toString());
            await model.user.subscribe({ sessionId: currentSessionId, username });

            const followers = await model.user.getFollowers(id);
            followersQuantity.innerHTML = String(followers.length);
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
        console.log(followers.filter(us => us.id === +currentUserId))
        if (followers.filter(us => us.id === +currentUserId).length > 0) {
            subscribeBtn.children[0].innerHTML = ln.Unsubscribe;
        } else {
            subscribeBtn.children[0].innerHTML = ln.Subscribe;
        }
        // const subscribed = localStorage.getItem('subscribed') === 'true';
        const session = await GeneralUserController.checkSession(currentSessionId, id);
        const username = session.username as string;
        // localStorage.setItem('subscribed', (!subscribed).toString());
    }
}

export default UserPageController;
