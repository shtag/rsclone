import URL from '../../types/constants';
import { UserInfo, UserSettings } from '../../types/types';

class ModelUsers {
    url = URL;

    /**
     * Get all users
     * @returns {Object} - object with all users
     */

    static async getAllUsers() {
        try {
            const response = await fetch(`${URL}/users`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Get user by id or username
     * @param {Object} userInfo - userInfo object - {username: string} or {id: number}
     * @returns {Object} - object with id, username, password, subscriptions, sessions, settings
     */

    static async getUser(userInfo: UserInfo) {
        try {
            const data = await fetch(`${URL}/user`, {
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
     * Delete user by id
     * @param {Object} sessionId - sessionId object - {sessionId: string}
     * @param {number} id - user id
     * @returns {status code}
     */

    static async deleteUser(id: number, sessionId: UserInfo) {
        try {
            const data = await fetch(`${URL}/user/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sessionId),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Change username or password
     * @param {Object} userInfo - userInfo object - {sessionId: string, username: string, password: string}
     * @param {number} id - user id
     * @returns {Object} - object with username
     */

    static async changeUsernamePassword(id: number, userInfo: UserInfo) {
        try {
            const data = await fetch(`${URL}/user/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Change user settings
     * @param {Object} settings - settings object - {sessionId: string, settings: object}
     * @param {number} id - user id
     * @returns {status code}
     */

    static async changeUserSettings(id: number, settings: UserSettings) {
        try {
            const data = await fetch(`${URL}/user/settings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Subscribe or unsubscribe
     * @param {Object} userInfo - userInfo object - {sessionId: string, username: string}
     * @returns {Object} - object with id, username, password, subscriptions, sessions, settings
     */

    static async subscription(userInfo: UserInfo) {
        try {
            const data = await fetch(`${URL}/subscribe`, {
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
     * Get user subscriptions by id
     * @param {number} id - user id
     * @returns {Array} - array with subscriptions
     */

    static async getUserSubscriptions(id: number) {
        try {
            const response = await fetch(`${URL}/subscriptions/${id}`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Get user followers by id
     * @param {number} id - user id
     * @returns {Array} - array with followers
     */

    static async getUserFollowers(id: number) {
        try {
            const response = await fetch(`${URL}/followers/${id}`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }
}

export default ModelUsers;
