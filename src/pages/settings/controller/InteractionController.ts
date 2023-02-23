class InteractionController {
    static changeSettingsTheme() {
        const autoTheme = document.querySelector('.settings__theme') as HTMLInputElement;

        autoTheme.addEventListener('click', () => {
            if (autoTheme.checked) {
                localStorage.setItem('autoTheme', 'true');
            } else {
                localStorage.setItem('autoTheme', 'false');
            }
        });
    }
}

export default InteractionController;


