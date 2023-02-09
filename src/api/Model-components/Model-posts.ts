import URL from '../../types/constants';
import { PostData } from '../../types/types';

class ModelPosts {
    url = URL;

    static async getAllPosts() {
        const response = await fetch(`${URL}/post`);
        return response.json();
    }

    static async getPostWithId(id: number) {
        const response = await fetch(`${URL}/post/${id}`);
        return response.json();
    }

    static async getUserPost(id: number) {
        const response = await fetch(`${URL}/post/${id}`);
        return response.json();
    }

    static async createPost(sessionId: string, image: string, description: string) {
        const data = await fetch(`${URL}/post`, {
            method: 'POST',
            body: JSON.stringify({ sessionId, image, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data.json();
    }
}

export default ModelPosts;
