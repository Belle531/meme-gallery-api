import type { Meme } from "../types/index.ts";

const memes: Meme[] = [
  { id: 1, title: "Distracted Boyfriend", imageUrl: "https://i.imgur.com/example1.jpg", createdAt: "2025-10-20T00:00:00Z" },
  { id: 2, title: "Success Kid", imageUrl: "https://i.imgur.com/example2.jpg", createdAt: "2025-10-20T00:00:00Z" }
];

export function getAllMemes(): Meme[] {
  return memes;
}
