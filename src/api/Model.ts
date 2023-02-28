import ModelAuth from "./Model-components/Model-auth";
import ModelPosts from "./Model-components/Model-posts";
import ModelUsers from "./Model-components/Model-users";
import { URL } from "../types/constants";
import { PhotoAPI, Post, User } from "../types/types";
import ModelComment from "./Model-components/Model-comment";

class Model {

    post: ModelPosts;

    user: ModelUsers;

    auth: ModelAuth;

    comment: ModelComment;

    url: string;

    imgurUrl: string;

    igmurKeyId: number;

    imgurKeys: string[];

    constructor() {
        this.url = URL;
        this.auth = new ModelAuth();
        this.user = new ModelUsers();
        this.post = new ModelPosts();
        this.comment = new ModelComment();
        this.imgurUrl = 'https://api.imgur.com/3/image';
        this.imgurKeys = ['63dda69691a368b', '60d6ea73ead50dd', 'a477503a6a7e455'];
        this.igmurKeyId = 0;
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

    /**
     * uploadPhoto
     * @param {FileList} files - input [type="file"] => input.files 
     * @returns {PhotoAPI} - object PhotoAPI
     */

    async uploadPhoto(files: FileList): Promise<PhotoAPI> {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Client-ID ${this.imgurKeys[this.igmurKeyId]}`);

        const formdata = new FormData();
        formdata.append("image", files[0]);
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
            referrer: ''
        };
        try {
            const res = await fetch(this.imgurUrl, requestOptions);
            const result = await res.json();
            return result;
        } catch (e) {
            if (this.igmurKeyId > 1) {
                this.igmurKeyId = 0
            } else {
                this.igmurKeyId += 1;
            }
            throw new Error();
        }

    }
}

const model = new Model();

export default model;