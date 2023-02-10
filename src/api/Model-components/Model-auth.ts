import { URL } from '../../types/constants';
import { Auth, Login, LogoutData } from '../../types/types';

class ModelAuth {
    url: string;

    constructor() {
        this.url = URL;
    }
    /**
     * Login
     * @param {string} username
     * @param {string} password
     * @returns {Object} - object - {username: string, sessionId: string, access: boolean}
     */

    async login(username: string, password: string):  Promise<Login>{
        try {
            const body = {
                username,
                password
            }
            const data = await fetch(`${this.url}/login`, {
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
     * Sign up
     * @param {Object} authData - authData object - {username: string, password: string}
     * @returns {Object} - object - {username: string, password: string}
     */

    async signUp(username: string, password: string): Promise<Auth> {
        try {
            const body = {
                username,
                password
            }
            const data = await fetch(`${this.url}/signup`, {
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
     * Check session
     * @param {Object} authData - authData object - {id: number, sessionId: string}
     * @returns {Object} - object - {sessionActive: boolean}
     */

    async checkSession(authData: LogoutData): Promise<{ sessionActive: boolean; }> {
        try {
            const data = await fetch(`${this.url}/user/session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(authData),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }

    /**
     * Logout
     * @param {Object} authData - authData object - {id: number, sessionId: string}
     * @returns {string} - string - logout
     */

    async logout(authData: LogoutData): Promise<void> {
        try {
            const data = await fetch(`${this.url}/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(authData),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }
}

export default ModelAuth;
