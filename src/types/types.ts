export interface PostData {
    sessionId: string;
    image?: string;
    description?: string;
}

export interface UserInfo {
    sessionId?: string;
    username?: string;
    password?: string;
    id?: number;
}

export interface UserSettings {
    sessionId: string;
    settings: {
        photo?: string;
        language?: string;
        name?: string;
        descriptionProfile?: string;
    };
}

export interface UserList {
    list: string[];
}

export interface UserListId {
    list: number[];
}

export interface Comments {
    sessionId: string;
    text?: string;
    commentId?: number;
}

export interface Auth {
    username: string;
    password: string;
}

export interface Feed {
    sessionId: string;
    limit: number;
    page: number;
}

export interface Search {
    query: string;
}

export interface Comment {
    text: string,
    date: number,
    likes: number[],
    id: number,
    author: number
}

export interface Post {
    id: number;
    image: string,
    description: string,
    date: number,
    likes: number[],
    comments: Comment[],
    author: number;
}