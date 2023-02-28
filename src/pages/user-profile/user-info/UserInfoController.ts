import confetti from 'canvas-confetti';
import model from '../../../api/Model';
import Router from '../../../router';
import dictionary from '../../staticElements/dictionary';
import LoadersView from '../../staticElements/loaders/loadersView';
import UserPageView from './UserInfoView';

class UserPageController {
    static avatar: string;

    static async setUserInfo(id: number) {
        const user = document.createElement('div');
        user.classList.add('user');

        const main = document.querySelector('main');
        main?.append(user);

        user.innerHTML = await UserPageView.renderUserInfo(id);

        await UserPageController.addProfilePhoto(id);
    }

    static async subscribeToUser(id: number) {
        const ln = dictionary[localStorage.lang];
        const user = await model.user.get(id);
        const subscribeBtn = document.querySelector('.subscribe__btn') as HTMLButtonElement;
        const currentSessionId = localStorage.getItem('sessionId') as string;
        const subUser = await model.user.subscribe({ sessionId: currentSessionId, username: user.username });
        const userCount = document.querySelector('.user__followers_quantity') as HTMLElement;
        if (subUser.subscriptions.includes(id)) {
            subscribeBtn.children[0].textContent = ln.Unsubscribe;
        } else {
            subscribeBtn.children[0].textContent = ln.Subscribe;
        }
        const followers = await model.user.getFollowers(id);
        userCount.textContent = followers.length.toString();
    }

    static async addProfilePhoto(id: number) {
        const photo = document.querySelector('.user__photo') as HTMLImageElement;
        if (!photo) return;
        const ln = dictionary[localStorage.lang];
        const userName = await model.user.get(id)

        const sessionId = localStorage.getItem('sessionId') as string;

        photo.addEventListener('click', async () => {
            const popup = document.createElement('div');
            popup.classList.add('popup');
            const popupHtml = `
                    <div class="popup">
                    <div class="add__photo popup_content">
                    <div class="avatar_img_block">
                        <img class="add__photo_new user__avatar_img" src="/img/base.jpg" alt="avatar" />
                    </div>
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
            const pop = document.querySelector('.popup') as HTMLImageElement;
            pop.addEventListener('click', (e) => {
                if ((e.target as HTMLElement).classList.contains('popup')) {
                    popupContainer.remove();
                }
            })
            const addAvatar = document.querySelector('.add__avatar') as HTMLInputElement;
            const newPhoto = popupContainer.querySelector('.add__photo_new') as HTMLImageElement;
            const createPhoto = popupContainer.querySelector('.add__photo_submit') as HTMLButtonElement;

            addAvatar.addEventListener('change', async () => {
                const block = document.querySelector('.avatar_img_block') as HTMLElement;
                block.innerHTML = LoadersView.add();
                const img = await model.uploadPhoto(addAvatar.files as FileList);
                UserPageController.avatar = img.data.link;
                newPhoto.src = img.data.link;
                block.innerHTML = `
                <img class="add__photo_new user__avatar_img" src="${img.data.link}" alt="avatar" />
                `
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
