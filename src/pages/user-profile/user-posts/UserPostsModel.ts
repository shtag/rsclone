class UserPostsModel {
    static async getUserPosts(url: string) {
        const res = await fetch(url);
        const data = await res.json();
        const { results } = data;
        return results;
    }
}

export default UserPostsModel;
