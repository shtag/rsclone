import HeaderView from './HeaderView';

class HeaderController {
    static dayMode() {
        const togler = document.querySelector('.theme') as HTMLInputElement;
        const root = document.querySelector('body') as HTMLBodyElement;
        togler.addEventListener('click', () => {
            if (togler.checked === false) {
                root.classList.remove('')
                root.classList.add('.day');
            }
        })
    }

}

export default HeaderController;
