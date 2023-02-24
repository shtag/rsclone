import SearchView from "./searchPopupView";
import './search.scss';
import model from "../../../api/Model";
import { Post, User } from "../../../types/types";

class SearchController {
    isPopupActive: boolean;

    constructor() {
        this.isPopupActive = false;
    }

    async renderPopup() {
        const body = document.querySelector('body') as HTMLBodyElement;
        body.innerHTML += SearchView.structure();
        this.setListeners();
    }

    openPopUp() {
        const popup = document.querySelector('.search_popup_block') as HTMLElement;
        popup.classList.toggle('search_active');
        this.isPopupActive = !this.isPopupActive;
    }

    renderResult(searchResult: { posts: Post[]; users: User[] }) {
        if (!this.isPopupActive) return
        const searchUsers = searchResult.users.map(user => SearchView.searchUserItem(user));
        const searchPosts = searchResult.posts.map(post => SearchView.searchPostItem(post));
        const resultUsers = document.querySelector('.search_results_users') as HTMLElement;
        const resultPosts = document.querySelector('.search_results_posts') as HTMLElement;
        resultPosts.innerHTML = searchPosts.join('');
        resultUsers.innerHTML = searchUsers.join('');
    }

    setListeners() {
        const body = document.querySelector('body') as HTMLBodyElement;
        const html = document.querySelector('html') as HTMLElement;
        const searchInput = document.querySelector('.search_input') as HTMLInputElement;
        body.addEventListener('click', (e) => {
            const popup = (e.target as HTMLElement).closest('.search_popup_block') as HTMLElement;
            const searchBtn = (e.target as HTMLElement).closest('.search-btn') as HTMLElement;
            const openUsers = (e.target as HTMLElement).closest('.search_open_users') as HTMLElement;
            const openPosts = (e.target as HTMLElement).closest('.search_open_posts') as HTMLElement;
            const resultsContsiner = document.querySelector('.search_results') as HTMLElement;

            if (this.isPopupActive && !popup) {
                html.classList.remove('overflow_hidden')
                searchInput.value = '';
                this.renderResult({ posts: [], users: [] });
                resultsContsiner.classList.remove('posts_active');
                this.openPopUp();
            } else if (searchBtn) {
                this.openPopUp();
                html.classList.add('overflow_hidden')
            } else if (openUsers) {
                resultsContsiner.classList.remove('posts_active');
            } else if (openPosts) {
                resultsContsiner.classList.add('posts_active');
            }
        })
        searchInput.addEventListener('input', async () => {
            const searchResult = await model.search(searchInput.value);
            if (searchInput.value === '') {
                this.renderResult({ posts: [], users: [] });
                return;
            }
            this.renderResult(searchResult);
        })

    }
}

const search = new SearchController();

export default search;