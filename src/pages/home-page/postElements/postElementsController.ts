import { Post } from '../../../types/types';
import PostsElementsModel from './postElemensModel';
import postElemens from './postElemensView';

export class PostElementsController {
    
    static async checkPosition(id: number) {
        // const allPosts: Post[] = await PostsElementsModel.getAllPosts();
        window.addEventListener('scroll', async () => {
            const height = document.body.offsetHeight;
            const screenHeight = window.innerHeight;
            const scrolled = window.scrollY;
            const threshold = height - screenHeight / 4;
            const position = scrolled + screenHeight;
            if (position >= threshold) {
                await this.renderPosts(id + 1);
            }
        });
    }

    static async renderPosts(id = 1) {
        const PostData = await PostsElementsModel.getPostWithId(id);
        postElemens.renderPostElement(await PostData);
        // await this.checkPosition(id);
    }
}

export default PostElementsController;
