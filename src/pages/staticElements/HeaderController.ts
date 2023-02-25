import postElemens from "../home-page/postElements/postElemensView";
import HeaderView from "./HeaderView";

class HeaderController {
    static switchTheme() {
        const root = document.querySelector('body') as HTMLBodyElement;
        /* 
        console.log(111);
        function setTheme(value: string) {
            localStorage.setItem('theme', value);
            if (value === 'light') {
                root.classList.add('light-theme');
                toggle.checked = true;
            } else {
                root.classList.remove('light-theme');
                toggle.checked = false;
            }
        }
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (colorSchemeQuery.matches) {
            setTheme('light');
        } */
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
        window.onload = () => {

            const body = document.querySelector('body') as HTMLBodyElement;
            body.classList.remove('preload');
            HeaderController.changeTheme(localStorage.theme);

        };
        /* function handleColorSchemeChange(e: MediaQueryListEvent) {
            if (e.matches) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        }
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
        colorSchemeQuery.addEventListener('change', handleColorSchemeChange);
        HeaderController.changeTheme(localStorage.theme); */
    }


    static openLikedPosts() {
        const btn = document.querySelector('.likes-btn') as HTMLElement;
        btn.addEventListener('click', () => {
            const container = document.querySelector('.liked_container') as HTMLElement;
            if (container) {
                container.remove();
            } else {
                HeaderView.renderLikedPostsContainer();
            }
        })
    }


}

export default HeaderController;
