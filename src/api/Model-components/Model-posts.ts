import URL from '../../types/constants';
import { PostData, UserInfo, Comments } from '../../types/types';

class ModelPosts {
    url = URL;

    /**
     * Get all posts
     * @returns {Array} - array of objects with all posts
     */

    static async getAllPosts() {
        try {
            const response = await fetch(`${URL}/post`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Get user's post
     * @param {number} id - post id
     * @returns {Object} - user's post
     */

    static async getUserPost(id: number) {
        try {
            const response = await fetch(`${URL}/post/${id}`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Create new post
     * @param {Object} postData - postData object - {sessionId: string, image: string, description: string}
     * @returns {Object} - info of a new user's post
     */

    static async createNewPost(postData: PostData) {
        try {
            const data = await fetch(`${URL}/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Like/dislike post
     * @param {Object} userInfo - sessionId object - {sessionId: string}
     * @param {number} id - post id
     * @returns {Object} - liked/disliked post
     */

    static async likeDislikePost(id: number, userInfo: UserInfo) {
        try {
            const data = await fetch(`${URL}/like/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Add comment
     * @param {Object} comment - comment object - {sessionId: string, text: string}
     * @param {number} id - post id
     * @returns {Object} - user's post
     */

    static async addComment(id: number, comment: Comments) {
        try {
            const data = await fetch(`${URL}/comment/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Delete comment
     * @param {Object} comment - comment object - {sessionId: string, commentId: number}
     * @param {number} id - post id
     * @returns {Object} - user's post
     */

    static async deleteComment(id: number, comment: Comments) {
        try {
            const data = await fetch(`${URL}/comment/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Like/dislike comment
     * @param {Object} comment - comment object - {sessionId: string, commentId: number}
     * @param {number} id - post id
     * @returns {Object} - user's post
     */

    static async likeDislikeComment(id: number, comment: Comments) {
        try {
            const data = await fetch(`${URL}/post/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }
}

export default ModelPosts;
