import confetti from 'canvas-confetti';
import model from '../../../api/Model';
import Router from '../../../router';
import { state } from '../../home-page/postElements/postElementsController';
import dictionary from '../../staticElements/dictionary';
import GeneralUserController from '../UserProfileController';
import UserPageView from './UserInfoView';

class UserPageController {
    static avatar: string;

    static async setUserInfo(id: number) {
        const user = document.createElement('div');
        user.classList.add('user');

        const main = document.querySelector('main');
        main?.append(user);

        user.innerHTML = await UserPageView.renderUserInfo(id);

        UserPageController.addProfilePhoto(id);
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

        // subscribeBtn.addEventListener('click', async () => {
        //     const subscribed = localStorage.getItem('subscribed') === 'true';
        //     subscribeBtn.children[0].innerHTML = subscribed ? 'Subscribe' : 'Unsubscribe';
        //     localStorage.setItem('subscribed', (!subscribed).toString());
        //     await model.user.subscribe({ sessionId: currentSessionId, username });

        //     const followers = await model.user.getFollowers(id);
        //     followersQuantity.innerHTML = String(followers.length);
        // });
    }

    static async subscribeToUser(id: number) {
        const ln = dictionary[localStorage.lang];
        const user = await model.user.get(id);
        const followers = await model.user.getFollowers(id);
        const subscribeBtn = document.querySelector('.subscribe__btn') as HTMLButtonElement;
        const currentSessionId = localStorage.getItem('sessionId') as string;
        await model.user.subscribe({ sessionId: currentSessionId, username: user.username });
        const userCount = document.querySelector('.user__followers_quantity') as HTMLElement;
        if (subscribeBtn.children[0].textContent === ln.Unsubscribe) {
            subscribeBtn.children[0].innerHTML = ln.Subscribe;
        } else {
            subscribeBtn.children[0].innerHTML = ln.Unsubscribe;
        }
        userCount.textContent = followers.length.toString();
    }

    static async addProfilePhoto(id: number) {
        const photo = document.querySelector('.user__photo') as HTMLImageElement;
        const ln = dictionary[localStorage.lang];
        const userName = await model.user.get(id)

        const sessionId = localStorage.getItem('sessionId') as string;

        photo.addEventListener('click', async () => {
            const popup = document.createElement('div');
            popup.classList.add('popup');
            const popupHtml = `
                    <div class="popup">
                    <div class="add__photo popup_content">
                    <img class="add__photo_new user__avatar_img" src="/img/base.jpg" alt="avatar" />
                    <input class="add__avatar add__img" type="file" id="file" accept=".jpg,.jpeg,.png,.gif"/>
                    <label for="file" class="add__label">
                    <span>${ln.UploadYourImage}</span>
                    </label>
                    <button type="button" class="add__photo_submit open__post-btn" disabled>
                 <div class="text_button">${ln.CreatePost}</div>
              </button>
                    </div>
                    </div>
                `;
            const popupContainer = document.createElement('div');
            popupContainer.className = 'popup__container';
            popupContainer.innerHTML = popupHtml;
            document.body.appendChild(popupContainer);

            const addAvatar = document.querySelector('.add__avatar') as HTMLInputElement;
            const newPhoto = popupContainer.querySelector('.add__photo_new') as HTMLImageElement;
            const createPhoto = popupContainer.querySelector('.add__photo_submit') as HTMLButtonElement;

            addAvatar.addEventListener('change', async () => {
                const img = await model.uploadPhoto(addAvatar.files as FileList);
                UserPageController.avatar = img.data.link;
                newPhoto.src = img.data.link;
                createPhoto.disabled = false;
            });

            createPhoto.addEventListener('click', async () => {
                try {
                    if (localStorage.sessionId) {
                        await model.user.changeSettings(id, { sessionId, settings: { photo: UserPageController.avatar } });
                    }
                    confetti({
                        particleCount: 400,
                        startVelocity: 90,
                        spread: 360,
                    });

                    setTimeout(() => {
                        window.history.pushState({}, '', `/${userName.username}`);
                        Router.handleLocation();
                        popupContainer.remove();
                    }, 1500);
                } catch (error) {
                    alert('An error occured, please try again later.');
                }
            });
        });
    }
}

export default UserPageController;
