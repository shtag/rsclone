
class HeaderController {
    static switchTheme() {
        
        const togler = document.querySelector('.theme') as HTMLInputElement;
        const root = document.querySelector('body') as HTMLBodyElement;
        togler.addEventListener('click', () => {
            if (togler.checked === true) {
                root.classList.add('light-theme');
            }
            if (togler.checked === false) {
                root.classList.remove('light-theme');
            }
        })
    }

}

export default HeaderController;
