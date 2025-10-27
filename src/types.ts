export enum Category {
  CLASSIC = "CLASSIC",
  DANK = "DANK",
  WHOLESOME = "WHOLESOME"
}

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
  category?: Category;
  createdAt?: string;
}

export interface Like {
  id: number;
  userId: number;
  memeId: number;
}
