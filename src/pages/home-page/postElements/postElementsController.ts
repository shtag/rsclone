import PostsElementsModel from './postElemensModel';
import postElemens from './postElemensView';

export class PostElementsController {
    static async renderPosts() {
        const data = PostsElementsModel.getAllPosts();
        postElemens.renderPostElements(await data);
    }
}

export default PostElementsController;