import { z } from "zod";
export const memeSchema = z.object({
    title: z.string().min(3),
    url: z.string().url(),
});
export const userSchema = z.object({
    username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9]+$/),
    password: z.string().min(6),
});
//# sourceMappingURL=validation.js.map