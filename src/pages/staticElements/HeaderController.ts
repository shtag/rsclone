import PageController from '../PageController';

class HeaderController {
    static async switchTheme() {
        const togler = document.querySelector('.theme') as HTMLInputElement;
        const root = document.querySelector('body') as HTMLBodyElement;

        function handleColorSchemeChange(e: MediaQueryListEvent) {
            if (e.matches) {
                togler.checked = true;
                root.classList.add('light-theme');
            } else {
                togler.checked = false;
                root.classList.remove('light-theme');
            }
        }

        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
        colorSchemeQuery.addEventListener('change', handleColorSchemeChange);

        if (colorSchemeQuery.matches) {
            togler.checked = true;
            root.classList.add('light-theme');
        } else {
            togler.checked = false;
            root.classList.remove('light-theme');
        }

        togler.addEventListener('click', () => {
            if (togler.checked) {
                togler.checked = true;
                root.classList.add('light-theme');
            } else {
                togler.checked = false;
                root.classList.remove('light-theme');
            }
        });
    }

    static loaderControlAnimation() {
        window.onload = () => {
            const body = document.querySelector('body') as HTMLBodyElement;
            body.classList.remove('preload');
        };
    }
}

export default HeaderController;
