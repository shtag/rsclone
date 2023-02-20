import model from '../../api/Model';
import svg from './svg';



export class HeaderView {
    static renderHeaderContainer() {
        const header = document.querySelector('header') as HTMLElement;
        let HTMLHeader = '';
        HTMLHeader = `
        <a class="logo-header_container route" href="/feed"><img class="logo-header" src="/img/logo-mini.png" alt="">
        <p class="text-logo">Kotogram</p>
        </a> 
        <div class="header-bar_container">
        <input class="theme" type="checkbox">
        </div>
        `;
        header.innerHTML = HTMLHeader;
        if (localStorage.sessionId !== undefined) {
            this.renderHeaderAfterLogin();
        } else {
            this.renderHeaderBeforeLogin();
        }
    }

    static async renderHeaderAfterLogin() {
        const userID = Number(localStorage.getItem('userId'));
        const user = model.user.get(userID);
        const headerBarContainer = document.querySelector('.header-bar_container') as HTMLElement;
        let HTMLHeaderBarContainer = '';
        HTMLHeaderBarContainer = `
        <a class="route create_post-btn" href="/add">
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12V15.45C2 18.299 2.698 19.455 3.606 20.394C4.546 21.303 5.704 22.002 8.552 22.002H15.448C18.296 22.002 19.454 21.302 20.394 20.394C21.302 19.455 22 18.3 22 15.45V8.552C22 5.703 21.302 4.546 20.394 3.607C19.454 2.7 18.296 2 15.448 2H8.552C5.704 2 4.546 2.699 3.606 3.607C2.698 4.547 2 5.703 2 8.552V12Z" stroke="#f9fdfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.54501 12.001H17.455" stroke="#f9fdfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.003 6.545V17.455" stroke="#f9fdfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </a>
        <button class="likes-btn"><svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.792 2.904C18.1064 2.97667 19.3389 3.56591 20.2207 4.54331C21.1026 5.52071 21.5624 6.80705 21.5 8.122C21.5 11.194 18.848 13.081 16.303 15.344C13.791 17.587 12.438 18.813 12 19.096C11.523 18.787 9.85698 17.273 7.69698 15.344C5.14098 13.072 2.49998 11.167 2.49998 8.122C2.43755 6.80705 2.89737 5.52071 3.77924 4.54331C4.66111 3.56591 5.89355 2.97667 7.20798 2.904C7.93613 2.88193 8.65754 3.04919 9.30169 3.3894C9.94585 3.72962 10.4907 4.23117 10.883 4.845C11.723 6.02 11.863 6.608 12.003 6.608C12.143 6.608 12.281 6.02 13.113 4.842C13.503 4.22533 14.0481 3.7218 14.6937 3.38172C15.3393 3.04164 16.0628 2.87691 16.792 2.904ZM16.792 0.904003C15.8839 0.87493 14.981 1.05109 14.1504 1.41935C13.3199 1.78762 12.5831 2.33851 11.995 3.031C11.4074 2.34053 10.6721 1.79091 9.84353 1.42276C9.01496 1.0546 8.11427 0.877316 7.20798 0.904003C5.36285 0.976155 3.62136 1.77599 2.36432 3.1286C1.10728 4.48121 0.436977 6.27654 0.499982 8.122C0.499982 11.732 3.04998 13.949 5.51498 16.092C5.79798 16.338 6.08398 16.586 6.36798 16.839L7.39498 17.757C8.51502 18.8228 9.68925 19.8301 10.913 20.775C11.2368 20.9846 11.6143 21.0962 12 21.0962C12.3857 21.0962 12.7632 20.9846 13.087 20.775C14.3497 19.8013 15.56 18.7615 16.713 17.66L17.635 16.836C17.928 16.576 18.225 16.317 18.52 16.062C20.854 14.037 23.5 11.742 23.5 8.122C23.563 6.27654 22.8927 4.48121 21.6356 3.1286C20.3786 1.77599 18.6371 0.976155 16.792 0.904003Z" fill="#f9fdfe"/>
        </svg></button>
        <a class="profile-btn route" href="/shtag"></a>
        <input class="theme" type="checkbox">
            `;
        headerBarContainer.innerHTML = HTMLHeaderBarContainer;
        const img = document.querySelector('.profile-btn') as HTMLElement;
        img.innerHTML = `<img src="${(await user).settings.photo}" alt="" class="mini_img">`;
        const NavBar = document.querySelector('aside');
        NavBar?.remove();
        this.renderNavBar();
    }

    static async renderHeaderBeforeLogin() {
        const headerBarContainer = document.querySelector('.header-bar_container') as HTMLElement;
        let HTMLHeaderBarContainer = '';
        HTMLHeaderBarContainer = `
        <a class="profile-btnBefore route" href="/login">Login</a>
        <input class="theme" type="checkbox">
            `;
        headerBarContainer.innerHTML = HTMLHeaderBarContainer;
        const NavBar = document.querySelector('aside');
        NavBar?.remove();
        this.renderNavBar();
    }

    static renderNavBar() {
        const body = document.querySelector('body') as HTMLBodyElement;
        const NavBar = document.createElement('aside');
        NavBar.className = 'nav-bar_container';
        let HTMLNavBar = '';
        HTMLNavBar = `
        <a href="/feed" class="home-btn route">${svg.home}</a>
        <button class="search-btn">${svg.search}</button>
        <button class="setting-btn">${svg.settings}</button>
        `;
        NavBar.innerHTML = HTMLNavBar;
        body.append(NavBar);
        const search = NavBar.querySelector('.search-btn') as HTMLButtonElement;
        const setting = NavBar.querySelector('.setting-btn') as HTMLButtonElement;
        if (localStorage.sessionId === undefined) {
            search.disabled = true;
            setting.disabled = true;
        }
        this.renderSettingPopup();
        this.openSetting();
    }

    static renderSettingPopup() {
        const body = document.querySelector('body') as HTMLElement;
        const popup = document.createElement('div');
        popup.className = 'setting_popup';
        body.append(popup);
    }

    static openSetting() {
        const popup = document.querySelector('.setting_popup') as HTMLDivElement;
        const btn = document.querySelector('.setting-btn') as HTMLButtonElement;
        btn.onclick = () => {
            if (popup.classList.contains('open')) {
                popup.classList.remove('open');
            } else {
                popup.classList.add('open');
            }
        };
    }
}

export default HeaderView;
