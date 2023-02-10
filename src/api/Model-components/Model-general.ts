import { URL } from '../../types/constants';

class ModelGeneral {
    url = URL;

    /**
     * Search
     * @returns {Object} - object with full data
     */

    static async getFullData() {
        try {
            const response = await fetch(`${URL}`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }
}

export default ModelGeneral;
