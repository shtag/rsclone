import URL from '../../types/constants';
import { Auth, UserInfo } from '../../types/types';

class ModelAuth {
    url = URL;

    /**
     * Login
     * @param {Object} authData - authData object - {username: string, password: string}
     * @returns {Object} - object - {username: string, sessionId: string, access: boolean}
     */

    static async login(authData: Auth) {
        try {
            const data = await fetch(`${URL}/login`, {
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
     * Sign up
     * @param {Object} authData - authData object - {username: string, password: string}
     * @returns {Object} - object - {username: string, password: string}
     */

    static async signUp(authData: Auth) {
        try {
            const data = await fetch(`${URL}/signup`, {
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
     * Check session
     * @param {Object} authData - authData object - {username: string, sessionId: string}
     * @returns {Object} - object - {sessionActive: boolean}
     */

    static async checkSession(authData: UserInfo) {
        try {
            const data = await fetch(`${URL}/user/session`, {
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
     * @param {Object} authData - authData object - {username: string, sessionId: string}
     * @returns {string} - string - logout
     */

    static async logout(authData: UserInfo) {
        try {
            const data = await fetch(`${URL}/logout`, {
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
