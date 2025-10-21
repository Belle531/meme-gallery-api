export interface User {
    id?: number;
    username: string;
    password: string;
    role?: "regular" | "admin";
}
export interface Like {
    id?: number;
    userId: number;
    memeId: number;
}
export interface Meme {
    id: number;
    title: string;
    imageUrl: string;
    createdAt: string;
}
//# sourceMappingURL=index.d.ts.map