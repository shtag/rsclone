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
        const resultBlock = document.querySelector('.search_results') as HTMLElement;
        // resultBlock.innerHTML = searchUsers.join('');
        resultBlock.innerHTML = searchPosts.join('');
    }

    setListeners() {
        const body = document.querySelector('body') as HTMLBodyElement;
        body.addEventListener('click', (e) => {
            const popup = (e.target as HTMLElement).closest('.search_popup_block') as HTMLElement;
            const searchBtn = (e.target as HTMLElement).closest('.search-btn') as HTMLElement;
            if (this.isPopupActive && !popup) {
                this.openPopUp();
            } else if (searchBtn) {
                this.openPopUp();
            }
        })
        const searchInput = document.querySelector('.search_input') as HTMLInputElement;
        searchInput.addEventListener('input', async () => {
            const searchResult = await model.search(searchInput.value);
            this.renderResult(searchResult);
            console.log(searchResult);
        })

    }
}

const search = new SearchController();

export default search;