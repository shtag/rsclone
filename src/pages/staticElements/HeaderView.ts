import model from '../../api/Model';

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
        <button class="create_post-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12V15.45C2 18.299 2.698 19.455 3.606 20.394C4.546 21.303 5.704 22.002 8.552 22.002H15.448C18.296 22.002 19.454 21.302 20.394 20.394C21.302 19.455 22 18.3 22 15.45V8.552C22 5.703 21.302 4.546 20.394 3.607C19.454 2.7 18.296 2 15.448 2H8.552C5.704 2 4.546 2.699 3.606 3.607C2.698 4.547 2 5.703 2 8.552V12Z" stroke="#f9fdfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.54501 12.001H17.455" stroke="#f9fdfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.003 6.545V17.455" stroke="#f9fdfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>
        <button class="likes-btn"><svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.792 2.904C18.1064 2.97667 19.3389 3.56591 20.2207 4.54331C21.1026 5.52071 21.5624 6.80705 21.5 8.122C21.5 11.194 18.848 13.081 16.303 15.344C13.791 17.587 12.438 18.813 12 19.096C11.523 18.787 9.85698 17.273 7.69698 15.344C5.14098 13.072 2.49998 11.167 2.49998 8.122C2.43755 6.80705 2.89737 5.52071 3.77924 4.54331C4.66111 3.56591 5.89355 2.97667 7.20798 2.904C7.93613 2.88193 8.65754 3.04919 9.30169 3.3894C9.94585 3.72962 10.4907 4.23117 10.883 4.845C11.723 6.02 11.863 6.608 12.003 6.608C12.143 6.608 12.281 6.02 13.113 4.842C13.503 4.22533 14.0481 3.7218 14.6937 3.38172C15.3393 3.04164 16.0628 2.87691 16.792 2.904ZM16.792 0.904003C15.8839 0.87493 14.981 1.05109 14.1504 1.41935C13.3199 1.78762 12.5831 2.33851 11.995 3.031C11.4074 2.34053 10.6721 1.79091 9.84353 1.42276C9.01496 1.0546 8.11427 0.877316 7.20798 0.904003C5.36285 0.976155 3.62136 1.77599 2.36432 3.1286C1.10728 4.48121 0.436977 6.27654 0.499982 8.122C0.499982 11.732 3.04998 13.949 5.51498 16.092C5.79798 16.338 6.08398 16.586 6.36798 16.839L7.39498 17.757C8.51502 18.8228 9.68925 19.8301 10.913 20.775C11.2368 20.9846 11.6143 21.0962 12 21.0962C12.3857 21.0962 12.7632 20.9846 13.087 20.775C14.3497 19.8013 15.56 18.7615 16.713 17.66L17.635 16.836C17.928 16.576 18.225 16.317 18.52 16.062C20.854 14.037 23.5 11.742 23.5 8.122C23.563 6.27654 22.8927 4.48121 21.6356 3.1286C20.3786 1.77599 18.6371 0.976155 16.792 0.904003Z" fill="#f9fdfe"/>
        </svg></button>
        <a class="profile-btn route" href="/shtag"></a>
        <input class="theme" type="checkbox">
            `;
        headerBarContainer.innerHTML = HTMLHeaderBarContainer;
        this.renderNavBar();
        const img = document.querySelector('.profile-btn') as HTMLElement;
        img.innerHTML = `<img src="${(await user).settings.photo}" alt="" class="mini_img">`;
    }

    static async renderHeaderBeforeLogin() {
        const headerBarContainer = document.querySelector('.header-bar_container') as HTMLElement;
        let HTMLHeaderBarContainer = '';
        HTMLHeaderBarContainer = `
        <a class="profile-btnBefore route" href="/login">Login</a>
        <input class="theme" type="checkbox">
            `;
        headerBarContainer.innerHTML = HTMLHeaderBarContainer;
    }

    static renderNavBar() {
        const body = document.querySelector('body') as HTMLBodyElement;
        const NavBar = document.createElement('aside');
        NavBar.className = 'nav-bar_container';
        let HTMLNavBar = '';
        HTMLNavBar = `
        <button class="create_post-btn"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.005 15.545C8.005 14.7501 8.32075 13.9878 8.8828 13.4258C9.44485 12.8638 10.2071 12.548 11.002 12.548C11.3957 12.5479 11.7855 12.6253 12.1492 12.7758C12.5129 12.9264 12.8434 13.1471 13.1218 13.4254C13.4002 13.7038 13.6211 14.0342 13.7718 14.3979C13.9224 14.7615 14 15.1513 14 15.545V21H21V10.543L11 1L1 10.543V21H8.005V15.545Z" stroke="#f9fdfe" stroke-width="2" stroke-linejoin="round"/>
        </svg></button>
        <button class="likes-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 10.5C19 12.1811 18.5015 13.8245 17.5675 15.2223C16.6335 16.6202 15.306 17.7096 13.7528 18.353C12.1996 18.9963 10.4906 19.1647 8.84174 18.8367C7.1929 18.5087 5.67834 17.6992 4.4896 16.5104C3.30085 15.3217 2.4913 13.8071 2.16333 12.1583C1.83535 10.5094 2.00368 8.80036 2.64703 7.24719C3.29037 5.69402 4.37984 4.3665 5.77766 3.43251C7.17547 2.49852 8.81886 2 10.5 2C12.7543 2 14.9164 2.89553 16.5104 4.48959C18.1045 6.08365 19 8.24566 19 10.5Z" stroke="#f9fdfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.511 16.511L22 22" stroke="#f9fdfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></button>
        <button class="setting-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_43)">
        <path d="M12 20.635C16.769 20.635 20.635 16.769 20.635 12C20.635 7.23102 16.769 3.365 12 3.365C7.23103 3.365 3.36501 7.23102 3.36501 12C3.36501 16.769 7.23103 20.635 12 20.635Z" stroke="#f9fdfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.232 3.656C14.0604 3.60803 13.9009 3.52447 13.7637 3.41075C13.6266 3.29704 13.5149 3.15572 13.436 2.996L12.93 2H11.07L10.565 2.996C10.4861 3.15572 10.3744 3.29704 10.2373 3.41075C10.1001 3.52447 9.94058 3.60803 9.769 3.656M9.768 20.344C9.93958 20.392 10.0991 20.4755 10.2363 20.5892C10.3734 20.703 10.4851 20.8443 10.564 21.004L11.069 22H12.931L13.436 21.004C13.5149 20.8443 13.6266 20.703 13.7637 20.5892C13.9009 20.4755 14.0604 20.392 14.232 20.344M3.656 9.768C3.60803 9.93958 3.52447 10.0991 3.41075 10.2363C3.29704 10.3734 3.15572 10.4851 2.996 10.564L2 11.07V12.932L2.996 13.437C3.15572 13.5159 3.29704 13.6276 3.41075 13.7647C3.52447 13.9019 3.60803 14.0614 3.656 14.233M20.344 14.232C20.392 14.0604 20.4755 13.9009 20.5892 13.7637C20.703 13.6266 20.8443 13.5149 21.004 13.436L22 12.93V11.07L21.004 10.565C20.8443 10.4861 20.703 10.3744 20.5892 10.2373C20.4755 10.1001 20.392 9.94058 20.344 9.769M7.678 4.522C7.52269 4.60944 7.35069 4.66318 7.17323 4.67972C6.99576 4.69626 6.8168 4.67523 6.648 4.618L5.588 4.27L4.27 5.587L4.618 6.649C4.67523 6.8178 4.69626 6.99676 4.67972 7.17423C4.66318 7.35169 4.60944 7.52369 4.522 7.679M16.322 19.478C16.4773 19.3906 16.6493 19.3368 16.8268 19.3203C17.0042 19.3037 17.1832 19.3248 17.352 19.382L18.412 19.73L19.73 18.413L19.382 17.351C19.3248 17.1822 19.3037 17.0032 19.3203 16.8258C19.3368 16.6483 19.3906 16.4763 19.478 16.321M4.522 16.322C4.60944 16.4773 4.66318 16.6493 4.67972 16.8268C4.69626 17.0042 4.67523 17.1832 4.618 17.352L4.27 18.412L5.587 19.73L6.649 19.382C6.8178 19.3248 6.99676 19.3037 7.17423 19.3203C7.35169 19.3368 7.52369 19.3906 7.679 19.478M19.478 7.678C19.3906 7.52269 19.3368 7.35069 19.3203 7.17323C19.3037 6.99576 19.3248 6.8168 19.382 6.648L19.73 5.588L18.413 4.27L17.351 4.618C17.1822 4.67523 17.0032 4.69626 16.8258 4.67972C16.6483 4.66318 16.4763 4.60944 16.321 4.522" stroke="#f9fdfe" stroke-width="2" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_1_43">
        <rect width="24" height="24" fill="#f9fdfe"/>
        </clipPath>
        </defs>
        </svg></button>
    </div>
            </header>
        `;
        NavBar.innerHTML = HTMLNavBar;
        body.append(NavBar);
    }
}

export default HeaderView;
