

interface UserInfo {
    sessionId?: string;
    password?: string;
    id?: number;
}
interface ChangeUsernamePass {
    sessionId: string;
    password: string;
    username: string;
}
interface LogoutData {
    sessionId?: string;
    id?: number;
}
interface SubscribeRequest {
    sessionId: string;
    username: string;
}

interface UserSettingsRequest {
    sessionId: string;
    settings: {
        photo?: string;
        language?: string;
        name?: string;
        descriptionProfile?: string;
    };
}

interface UserList {
    list: string[];
}

interface UserListId {
    list: number[];
}

interface Auth {
    username: string;
    password: string;
}

interface Login {
    username: string;
    sessionId: string;
    id: number;

}

interface FeedRequest {
    sessionId: string;
    limit: number;
    page: number;
}

interface CommentRequest {
    sessionId: string;
    text: string;
}

interface CommentsLikeRequest {
    sessionId: string;
    text?: string;
    commentId?: number;
}

interface Comment {
    text: string;
    date: number;
    likes: number[];
    id: number;
    author: number;
}

interface PostRequest {
    sessionId: string;
    image: string;
    description: string;
}

interface Post {
    id: number;
    image: string;
    description: string;
    date: number;
    likes: number[];
    comments: Comment[];
    author: number;
}

interface User {
    id: number;
    username: string;
    password: string;
    subscriptions: number[];
    sessions: string[];
    favorites: number[];
    settings: {
        photo: string;
        language: string;
        name: string;
        descriptionProfile: string;
    };
}

interface Search {
    users: User[];
    posts: Post[];
}

interface PhotoAPI {
    data: {
        link: string;
        datetime: number;
        height: number;
        width: number;
        type: string;
        size: number;
    };
    status: number;
    success: boolean;
}

export {
    Post,
    PostRequest,
    CommentRequest,
    Comment,
    CommentsLikeRequest,
    FeedRequest,
    Auth,
    UserList,
    UserListId,
    UserSettingsRequest,
    UserInfo,
    User,
    Login,
    LogoutData,
    ChangeUsernamePass,
    SubscribeRequest,
    Search,
    PhotoAPI
}