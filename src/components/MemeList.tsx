// This file previously contained React code for MemeList.
// Refactored: No React code. You can implement a plain TypeScript utility or remove this file if not needed.

// Example: TypeScript-only meme list utility
import type { Meme } from "../types/index.js";

export function getMemeTitles(memes: Meme[]): string[] {
  return memes.map(meme => meme.title);
}