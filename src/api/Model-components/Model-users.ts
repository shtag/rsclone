import { URL } from '../../types/constants';
import { UserInfo, UserList, UserListId, User, ChangeUsernamePass, UserSettingsRequest } from '../../types/types';

class ModelUsers {
    url: string;

    constructor() {
        this.url = URL;
    }

    /**
     * Get all users
     * @returns {Object} - object with all users
     */

    async getAll(): Promise<User[]> {
        try {
            const response = await fetch(`${this.url}/users`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Get user by id
     * @returns {Object} - object with id, username, password, subscriptions, sessions, settings
     */

    async get(id: number): Promise<User> {
        try {
            const body = { id }
            const data = await fetch(`${this.url}/user`, {
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
     * Delete user by id
     * @param {number} id - user id
     * @returns {status code}
     */

    async delete(id: number, sessionId: string): Promise<void> {
        try {
            const body = {sessionId}
            const data = await fetch(`${this.url}/user/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
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

    async changeUsernamePassword(id: number, userInfo: ChangeUsernamePass): Promise<{ username: string; }> {
        try {
            const data = await fetch(`${this.url}/user/${id}`, {
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

    async changeSettings(id: number, settings: UserSettingsRequest):  Promise<boolean>{
        try {
            await fetch(`${this.url}/user/settings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Subscribe or unsubscribe
     * @param {Object} userInfo - userInfo object - {sessionId: string, username: string}
     * @returns {Object} - object with id, username, password, subscriptions, sessions, settings
     */

    async subscribe(userInfo: UserInfo): Promise<User> {
        try {
            const data = await fetch(`${this.url}/subscribe`, {
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

    async getSubscriptions(id: number): Promise<User[] | []> {
        try {
            const response = await fetch(`${this.url}/subscriptions/${id}`);
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

    async getFollowers(id: number): Promise<User[] | []> {
        try {
            const response = await fetch(`${this.url}/followers/${id}`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Get userlist
     * @param {Array} list - array of strings
     * @returns {Object} - object of users info
     */

    async getList(list: UserList): Promise<User[] | []> {
        try {
            const data = await fetch(`${this.url}/userlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(list),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }

     /**
     * Get userlist by id
     * @param {Array} list - array of numbers
     * @returns {Object} - object of users info
     */

     async getUserlistById(list: UserListId): Promise<User[] | []> {
        try {
            const data = await fetch(`${this.url}/userlistid`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(list),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }
}

export default ModelUsers;
