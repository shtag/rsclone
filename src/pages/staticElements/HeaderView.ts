import model from '../../api/Model';
import svg from './svg';

import SettingsController from '../settings/controller/SettingsController';
import SettingsView from '../settings/SettingsView';
import Router from '../../router';
import { Post } from '../../types/types';
import HeaderController from './HeaderController';
import { disableScroll } from '../../types/functions';


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
            HeaderView.renderHeaderAfterLogin();
        } else {
            HeaderView.renderHeaderBeforeLogin();
        }
    }

    static async renderHeaderAfterLogin() {
        const userID = Number(localStorage.getItem('userId'));
        const user = await model.user.get(userID);
        const headerBarContainer = document.querySelector('.header-bar_container') as HTMLElement;
        let checked = 'checked';
        const themeActive = localStorage.theme;
        if (themeActive === 'dark') {
            checked = '';
        }
        let HTMLHeaderBarContainer = '';
        HTMLHeaderBarContainer = `
        <a class="route create_post-btn" href="/add">${svg.add}</a>
        <button class="likes-btn">${svg.likes}</button>
        <a class="profile-btn route" href="/${user.username}"></a>
        <input class="theme" type="checkbox" ${checked}>
            `;
        headerBarContainer.innerHTML = HTMLHeaderBarContainer;
        const img = document.querySelector('.profile-btn') as HTMLElement;
        img.innerHTML = `<img src="${user.settings.photo}" alt="" class="mini_img">`;
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
        <a href="/recommendation" class="recomendation-btn route">${svg.recomendation}</a>
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
        HeaderController.openLikedPosts();
    }

    static renderSettingPopup() {
        const body = document.querySelector('body') as HTMLElement;
        const popup = document.createElement('div') as HTMLDivElement;
        popup.className = 'setting_popup';
        const popupblock = document.querySelector('.setting_popup') as HTMLElement;
        if (popupblock) return;
        body.append(popup);
        popup.innerHTML += SettingsView.renderSettings();
        SettingsController.generalCredentialsController();
    }

    static openSetting() {
        const popup = document.querySelector('.setting_popup') as HTMLDivElement;
        const btn = document.querySelector('.setting-btn') as HTMLButtonElement;
        const body = document.querySelector('body') as HTMLBodyElement;

        btn.onclick = () => {
            if (popup.classList.contains('open')) {
                popup.classList.remove('open');
                disableScroll();
            } else {
                popup.classList.add('open');
            }
        };

        body.onclick = (event) => {
            if (!popup.contains(event.target as Node) && !btn.contains(event.target as Node)) {
                popup.classList.remove('open');
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);
            }
        };
    }

    static renderLikedPostsContainer() {
        const body = document.querySelector('body') as HTMLBodyElement;
        const container = document.createElement('div') as HTMLElement;
        container.className = 'liked_container';
        body.append(container);
        this.renderLikedImg();
    }

    static async renderLikedImg() {
        const container = document.querySelector('.liked_container') as HTMLElement;
        const userID = Number(localStorage.getItem('userId'));
        const posts: Post[] = await model.post.getUserPosts(userID);
        const likedPosts: Post[] = await posts.filter((post) => post.likes.length > 0);
        const imgElements: HTMLImageElement[] = likedPosts.map((post) => {
            const imgElement = document.createElement('img') as HTMLImageElement;
            imgElement.className = 'liked_img';
            imgElement.setAttribute('data-id', String(post.id));
            imgElement.src = post.image;
            return imgElement;
        });

        imgElements.forEach((imgElement) => {
            container.appendChild(imgElement);
        });

        container.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target.tagName === 'IMG') {
                const id = Number(target.getAttribute('data-id'));
                container.remove();
                await Router.openPost(id);
            }
        });
    }
}

export default HeaderView;
