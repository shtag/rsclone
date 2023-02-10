import ModelAuth from "../api/Model-components/Model-auth";
import ModelGeneral from "../api/Model-components/Model-general";
import ModelPosts from "../api/Model-components/Model-posts";
import ModelSearch from "../api/Model-components/Model-search";
import ModelUsers from "../api/Model-components/Model-users";

const URL = 'http://127.0.0.1:3000';
const sessionId = '$2b$10$NhL.XLXwthdA4kACTPIJg.'

export { URL, sessionId };



/* class Model{

    post: ModelPosts;

    user: ModelUsers;

    auth: ModelAuth;

    url: string;

    constructor() {
        this.url = URL;
        this.user = new ModelUsers()
        this.post = new ModelPosts()
        this.auth = new ModelAuth()
    }

    async getFullData() {
        try {
            const response = await fetch(`${this.url}`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }

    async searchData(query: string) {
        try {
            const body = {
                query
            }
            const data = await fetch(`${this.url}/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            return data.json();
        } catch (error) {
            throw new Error();
        }
    }
}

const model = new Model(); */


// const search = await model.searchData('shtag');
    

// console.log(search);
