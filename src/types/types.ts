export interface PostData {
    sessionId: string;
    image: string;
    description: string;
}

export interface comment {
    text: string,
    date: number,
    likes: string[],
    id: number,
    author: string
}

export interface Post {
    id: number;
    image: string,
    description: string,
    date: number,
    likes: string[],
    comments: comment[],
    author: string
}