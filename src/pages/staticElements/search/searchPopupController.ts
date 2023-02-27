import SearchView from "./searchPopupView";
import './search.scss';
import model from "../../../api/Model";
import { Post, User } from "../../../types/types";
import LoadersView from "../loaders/loadersView";
import { disableScroll, enableScroll } from "../../../types/functions";

class SearchController {
    popupActive: string;

    popup: string;

    constructor() {
        this.popupActive = 'search_active';
        this.popup = 'search_popup_block';
    }

    async renderPopup() {
        const body = document.querySelector('body') as HTMLBodyElement;
        const popup = document.querySelector(`.${this.popup}`) as HTMLElement;
        if (popup) return;
        body.innerHTML += SearchView.structure();
    }

    openPopUp() {
        const popup = document.querySelector('.search_popup_block') as HTMLElement;
        popup.classList.toggle(this.popupActive);
        const popupActive = document.querySelector(`.${this.popupActive}`) as HTMLElement;
        const html = document.querySelector('html') as HTMLElement;
        if (popupActive) {
            html.style.overflow = 'hidden';
        } else {
            html.style.overflow = '';
        }
        this.setListeners();
    }

    renderResult(searchResult: { posts: Post[]; users: User[] }) {
        const popup = document.querySelector(`.${this.popupActive}`) as HTMLElement;
        if (!popup) return
        const searchUsers = searchResult.users.map(user => SearchView.searchUserItem(user));
        const searchPosts = searchResult.posts.map(post => SearchView.searchPostItem(post));
        const resultUsers = document.querySelector('.search_results_users') as HTMLElement;
        const resultPosts = document.querySelector('.search_results_posts') as HTMLElement;
        resultPosts.innerHTML = searchPosts.join('');
        resultUsers.innerHTML = searchUsers.join('');
    }

    setListeners() {
        const searchInput = document.querySelector('.search_input') as HTMLInputElement;
        searchInput.addEventListener('input', async (e) => {
            const resultUsers = document.querySelector('.search_results_users') as HTMLElement;
            const resultPosts = document.querySelector('.search_results_posts') as HTMLElement;
            resultUsers.innerHTML = LoadersView.add();
            resultPosts.innerHTML = LoadersView.add();
            const searchResult = await model.search((e.target as HTMLInputElement).value);
            if (searchInput.value === '') {
                this.renderResult({ posts: [], users: [] });
                return;
            }
            this.renderResult(searchResult);
        })
    }

    setBodyListeners() {
        const body = document.querySelector('body') as HTMLBodyElement;
        const searchInput = document.querySelector('.search_input') as HTMLInputElement;
        this.setListeners();
        body.addEventListener('click', (e) => {
            const popup = (e.target as HTMLElement).closest('.search_popup_block') as HTMLElement;
            const searchBtn = (e.target as HTMLElement).closest('.search-btn') as HTMLElement;
            const openUsers = (e.target as HTMLElement).closest('.search_open_users') as HTMLElement;
            const openPosts = (e.target as HTMLElement).closest('.search_open_posts') as HTMLElement;
            const resultsContsiner = document.querySelector('.search_results') as HTMLElement;
            const popupActive = document.querySelector(`.${this.popupActive}`) as HTMLElement;
            if (popupActive && !popup) {
                searchInput.value = '';
                this.renderResult({ posts: [], users: [] });
                resultsContsiner.classList.remove('posts_active');
                this.openPopUp();
            } else if (searchBtn) {
                this.openPopUp();
            } else if (openUsers) {
                resultsContsiner.classList.remove('posts_active');
            } else if (openPosts) {
                resultsContsiner.classList.add('posts_active');
            }
        })
    }
}

const search = new SearchController();

export default search;