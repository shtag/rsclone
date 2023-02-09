import URL from '../../types/constants';

class ModelUsers {
    url = URL;

    static async getAllUsers() {
        const response = await fetch(`${URL}/users`);
        return response.json();
    }
}

export default ModelUsers;
