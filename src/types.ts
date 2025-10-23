export interface User {
  id: number;
  username: string;
  password: string;
  role?: "regular" | "admin";
}

export interface Meme {
  id: number;
  title: string;
  url: string;
  userId: number;
  category?: string;
  createdAt?: string;
}

export interface Like {
  id: number;
  userId: number;
  memeId: number;
}
