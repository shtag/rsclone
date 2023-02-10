import ModelPosts from "../../../api/Model-components/Model-posts";

class PostsElementsModel {

    static getAllPosts(){
        const data = ModelPosts.getAllPosts();
        return data;
    }

    static getPostWithId(id: number) {
        const data = ModelPosts.getPostById(id);
        return data;
    }
}

export default PostsElementsModel;