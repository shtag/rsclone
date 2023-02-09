import UserPageController from './user-info/UserInfoController';
import UserPostsController from './user-posts/UserPostsController';

class GeneralUserController {
    static setGeneralController() {
        const apiUrl =
            'https://api.unsplash.com/search/photos?query=cats&per_page=30&orientation=landscape&client_id=6vebiGSWISfyPAqACIbzaXa_49SfW3vjJMvZSS4VHIw';
        UserPageController.setUserInfo();
        UserPostsController.setPostsInfo();
        UserPostsController.getData(apiUrl);

        const posts = document.querySelector('.user__post-item_posts') as HTMLElement;
        const favorites = document.querySelector('.user__post-item_favorites') as HTMLElement;
        const saved = document.querySelector('.user__post-item_saved') as HTMLElement;
        const dividerPart = document.querySelector('.divider__part') as HTMLElement;

        const block = document.querySelectorAll('.user__post-item') as NodeListOf<HTMLElement>;

        block.forEach((el) => {
            el.addEventListener('click', () => {
                const icon = el.children[1] as HTMLButtonElement;
                const text = el.children[0] as HTMLImageElement;

                block.forEach((item) => {
                    item.children[1].classList.remove('active');
                    item.children[0].classList.remove('active_icon');
                });

                icon.classList.add('active');

                text.classList.add('active_icon');
            });
        });

        posts?.addEventListener('click', () => {
            UserPostsController.setPostsInfo();
            UserPostsController.getData(apiUrl);
            dividerPart.style.marginLeft = '7%';
        });

        favorites?.addEventListener('click', () => {
            dividerPart.style.marginLeft = '24.5%';
        });

        saved?.addEventListener('click', () => {
            dividerPart.style.marginLeft = '41.5%';
        });
    }
}

export default GeneralUserController;
