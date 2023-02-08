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
