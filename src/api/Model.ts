import ModelAuth from "./Model-components/Model-auth";
import ModelPosts from "./Model-components/Model-posts";
import ModelUsers from "./Model-components/Model-users";
import { URL } from "../types/constants";
import { Post, User } from "../types/types";
import ModelComment from "./Model-components/Model-comment";

class Model{

    post: ModelPosts;

    user: ModelUsers;

    auth: ModelAuth;

    comment: ModelComment;

    url: string;

    constructor() {
        this.url = URL;
        this.auth = new ModelAuth()
        this.user = new ModelUsers()
        this.post = new ModelPosts()
        this.comment = new ModelComment()
    }

    async getFullData() {
        try {
            const response = await fetch(`${this.url}`);
            return response.json();
        } catch (error) {
            throw new Error();
        }
    }

    async search(query: string): Promise<{ posts: Post[]; users: User[]; }> {
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

const model = new Model();

export default model;