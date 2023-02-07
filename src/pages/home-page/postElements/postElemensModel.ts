import ModelPosts from "../../../api/Model-components/Model-posts";

class PostsElementsModel {
    static getAllPosts(){
        const data = ModelPosts.getAllPosts();
        return data;
    }
}

export default PostsElementsModel;