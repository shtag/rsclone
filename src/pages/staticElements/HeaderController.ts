import HeaderView from "./HeaderView";

class HeaderController {
    static switchTheme() {
        const root = document.querySelector('body') as HTMLBodyElement;
        root.addEventListener('click', (e) => {
            const input = (e.target as HTMLInputElement).closest('.theme') as HTMLInputElement;
            if (input) {
                if (input.checked) {
                    HeaderController.changeTheme('light');
                } else {
                    HeaderController.changeTheme('dark');
                }
            }
        });
    }

    static changeTheme(theme: string) {
        const root = document.querySelector('body') as HTMLBodyElement;
        localStorage.setItem('theme', theme);
        if (theme === 'light') {
            root.classList.add('light-theme');
        } else if (theme === 'dark') {
            root.classList.remove('light-theme');
        }
    }


    static loaderControlAnimation() {
        const body = document.querySelector('body') as HTMLBodyElement;
        body.classList.remove('preload');
        HeaderController.changeTheme(localStorage.theme);
    }


    static openLikedPosts() {
        const container = document.querySelector('.liked_container') as HTMLElement;
        if (container) {
            container.remove();
        } else {
            HeaderView.renderLikedPostsContainer();
        }
    }

    static setListeners() {
        const body = document.querySelector('body') as HTMLElement;
        body.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.closest('.likes-btn')) {
                HeaderController.openLikedPosts()
            }
        })
    }

}

export default HeaderController;
