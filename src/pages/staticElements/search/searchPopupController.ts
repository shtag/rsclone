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
        body.innerHTML += SearchView.html()
        this.setListeners();
    }

    openPopUp() {
        const popup = document.querySelector('.search_popup_block') as HTMLElement;
        popup.classList.toggle('search_active');
        console.log('open');
        this.isPopupActive = !this.isPopupActive;
    }

    static closePopUp() {
        const popup = document.querySelector('.search_popup_block') as HTMLElement;
        popup.classList.remove('search_active');
    }

    renderResult(searchResult: { posts: Post[]; users: User[] }) {
        console.log(this.isPopupActive);
        const searchUsers = searchResult.users.map(user => SearchView.searchUserItem(user));
        const searchPosts = searchResult.posts.map(post => SearchView.searchPostItem(post));
        console.log(searchUsers.join(''))
        const resultUsers = document.querySelector('.search_results_users') as HTMLElement;
        const resultPosts = document.querySelector('.search_results_posts') as HTMLElement;
        // resultBlock.innerHTML = searchUsers.join('');
        resultPosts.innerHTML = searchPosts.join('');
        resultUsers.innerHTML = searchUsers.join('');
    }

    setListeners() {
        const body = document.querySelector('body') as HTMLBodyElement;
        const html = document.querySelector('html') as HTMLElement;
        body.addEventListener('click', (e) => {
            const popup = (e.target as HTMLElement).closest('.search_popup_block') as HTMLElement;
            const searchBtn = (e.target as HTMLElement).closest('.search-btn') as HTMLElement;
            const openUsers = (e.target as HTMLElement).closest('.search_open_users') as HTMLElement;
            const openPosts = (e.target as HTMLElement).closest('.search_open_posts') as HTMLElement;
            const resultsContsiner = document.querySelector('.search_results') as HTMLElement;

            if (this.isPopupActive && !popup) {
                this.openPopUp();
                html.classList.remove('overflow_hidden')
            } else if (searchBtn) {
                this.openPopUp();
                html.classList.add('overflow_hidden')
            } else if (openUsers) {
                resultsContsiner.classList.remove('posts_active');
            } else if (openPosts) {
                resultsContsiner.classList.add('posts_active');
            }
        })
        const searchInput = document.querySelector('.search_input') as HTMLInputElement;
        searchInput.addEventListener('input', async () => {
            const searchResult = await model.search(searchInput.value);
            if (searchInput.value === '') {
                this.renderResult({ posts: [], users: [] });
                return;
            }
            this.renderResult(searchResult);
            console.log(searchResult);
        })

    }
}

const search = new SearchController();

export default search;