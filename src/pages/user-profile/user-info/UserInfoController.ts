import model from '../../../api/Model';
import GeneralUserController from '../UserProfileController';
import UserPageView from './UserInfoView';

class UserPageController {
    static async setUserInfo(id: number) {
        const user = document.createElement('div');
        user.classList.add('user');

        const main = document.querySelector('main');
        main?.append(user);

        user.innerHTML = await UserPageView.renderUserInfo(id);
        await UserPageController.subscribe(id);
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
}

export default UserPageController;
