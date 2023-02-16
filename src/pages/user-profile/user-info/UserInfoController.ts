import UserPageView from './UserInfoView';

class UserPageController {
    static async setUserInfo(id: number) {
        const user = document.createElement('div');
        user.classList.add('user');

        const main = document.querySelector('main');
        main?.append(user);

        user.innerHTML = await UserPageView.renderUserInfo(id);

        //!
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
}

export default UserPageController;
