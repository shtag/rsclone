export interface PostData {
    sessionId: string;
    image: string;
    description: string;
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
