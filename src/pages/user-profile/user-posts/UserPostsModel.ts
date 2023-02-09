import ModelPosts from '../../../api/Model-components/Model-posts';

class UserPostsModel {
    static async getPosts(id: number) {
        const data = await ModelPosts.getUserPosts(id);
        return data;
    }
}

export default UserPostsModel;
