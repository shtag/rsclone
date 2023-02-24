import { Post, User } from "../../../types/types";

class SearchView {
    static html() {
        return `
            <div class="search_popup_block">
                <input type="search" class="search_input">
                <div class="search_nav">
                    <button class="search_open_users"><div class="text_button">Users</div></button>
                    <button class="search_open_posts"><div class="text_button">Posts</div></button>
                </div>
                <div class="search_results">
                    <div class="search_results_users"></div>
                    <div class="search_results_posts"></div>
                </div>
            </div>
            `
    }

    static searchUserItem(user: User) {
        return `
            <a href="/${user.username}" class="search_user route">
                <img src="${user.settings.photo}" class="search_user_image">
                <span>${user.username}</span>
            </a>
        `
    }

    static searchPostItem(post: Post) {
        return `
            <a class="search_post route" href="/p/${post.id}">
                <img src="${post.image}" class="search_post_image">
                <div>${post.description}</div>
            </a>
        `
    }
}

export default SearchView;