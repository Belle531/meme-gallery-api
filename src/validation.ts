import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export const memeSchema = z.object({
  title: z.string().min(1),
  imageUrl: z.string().url(),
});
