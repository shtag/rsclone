import ModelPosts from "../../../api/Model-components/Model-posts";

class PostsElementsModel {
    static getLastRenderedId() {
        throw new Error('Method not implemented.');
    }

    static getAllPosts(){
        const data = ModelPosts.getAllPosts();
        return data;
    }

    static getPostWithId(id: number) {
        const data = ModelPosts.getPostWithId(id);
        return data;
    }
}

export default PostsElementsModel;