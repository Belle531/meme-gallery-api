import { z } from "zod";
// User registration/login schema
export const userSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
// Meme creation/update schema
export const memeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    imageUrl: z.string().url("Must be a valid URL"),
});
//# sourceMappingURL=validation.js.map