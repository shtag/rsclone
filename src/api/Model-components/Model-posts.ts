
import { URL } from '../../types/constants';
import { FeedRequest, Post, PostRequest } from '../../types/types';

class ModelPosts {
    url: string;

    constructor() {
        this.url = URL;
    }
    /**
     * Get all posts
     * @returns {Array} - array of objects with all posts
     */

    async getAll(): Promise<Post[]> {
        try {
            const response = await fetch(`${this.url}/post`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Get post by id
     * @param {number} id - post id
     * @returns {Object} - user's post
     */

    async get(id: number): Promise<Post> {
        try {
            const response = await fetch(`${this.url}/post/${id}`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Get user's post
     * @param {number} id - user id
     * @returns {Object} - user's post
     */

    async getUserPosts(id: number): Promise<Post[] | []> {
        try {
            const response = await fetch(`${this.url}/userposts/${id}`);
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

    async create(postData: PostRequest): Promise<Post> {
        try {
            const data = await fetch(`${this.url}/post`, {
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
     * Delete post
     * @param {Object} postData - postData object - {sessionId: string}
     * @param {number} id - post id
     * @returns {Object} - deleted post
     */

    async delete(id: number, sessionId: string): Promise<boolean> {
        try {
            const body = {sessionId}
            await fetch(`${this.url}/post/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            return true
        } catch (error) {
            return false
        }
    }

    /**
     * Like/dislike post
     * @param {Object} userInfo - sessionId object - {sessionId: string}
     * @param {number} id - post id
     * @returns {Object} - liked/disliked post
     */

    async like(id: number, sessionId: string): Promise<Post> {
        try {
            const body = {sessionId}
            const data = await fetch(`${this.url}/like/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Feed
     * @param {Object} feedData - feedData object - {sessionId: string, limit: number, page: number}
     * @returns {Array} - feed
     */

    async feed(feedData: FeedRequest): Promise<Post[]> {
        try {
            const data = await fetch(`${this.url}/feed`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedData),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Recommendation feed
     * @param {Object} feedData - feedData object - {sessionId: string, limit: number, page: number}
     * @returns {Array} - feed
     */

    async recommendationFeed(feedData: FeedRequest): Promise<Post[]> {
        try {
            const data = await fetch(`${this.url}/recomendation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedData),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }
}

export default ModelPosts;
