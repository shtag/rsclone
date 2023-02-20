import { Post, User } from "../../../types/types";

class SearchView {
    static html() {
        return `
            <div class="search_popup_block">
                <input type="search" class="search_input">
                <div>
                    <button>Users</button>
                    <button>Posts</button>
                </div>
                <div class="search_results"></div>
            </div>
            `
    }

    static searchUserItem(user: User) {
        return `
            <div class="search_user">
                <a href="/${user.username}">
                    <img src="${user.settings.photo}">
                </a>
            </div>
        `
    }

    static searchPostItem(post: Post) {
        return `
            <a class="search_post" href="/p/${post.id}">
                <img src="${post.image}" class="search_post_image">
                <div>${post.description}</div>
            </a>
        `
    }
}

export default SearchView;