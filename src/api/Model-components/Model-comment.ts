import { URL } from '../../types/constants';
import { CommentRequest, CommentsLikeRequest, Post } from '../../types/types';

class ModelComment {
    url: string;

    constructor() {
        this.url = URL;
    }

    /**
     * Add comment
     * @param {Object} comment - comment object - {sessionId: string, text: string}
     * @param {number} id - post id
     * @returns {Object} - user's post
     */

    async add(id: number, comment: CommentRequest): Promise<Post> {
        try {
            const data = await fetch(`${this.url}/comment/${id}`, {
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

    async delete(id: number, comment: Comment): Promise<Post> {
        try {
            const data = await fetch(`${this.url}/comment/${id}`, {
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

    async like(id: number, comment: CommentsLikeRequest): Promise<Post> {
        try {
            const data = await fetch(`${this.url}/post/${id}`, {
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

export default ModelComment;