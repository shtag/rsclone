import URL from '../../types/constants';
import { Search } from '../../types/types';

class ModelSearch {
    url = URL;

    /**
     * Search
     * @param {Object} search - search object - {query: string}
     * @returns {Object} - search for params
     */

    static async searchData(search: Search) {
        try {
            const data = await fetch(`${URL}/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(search),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }
}

export default ModelSearch;
