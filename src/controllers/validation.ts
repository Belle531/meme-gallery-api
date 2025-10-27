
import { z } from "zod";
import { Category } from "../types";

export const memeSchema = z.object({
  title: z.string().min(3),
  url: z.string().url(),
  category: z.nativeEnum(Category).optional()
});

export const userSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9]+$/),
  password: z.string().min(6),
});
