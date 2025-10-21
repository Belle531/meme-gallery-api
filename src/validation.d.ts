import { z } from "zod";
export declare const userSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const memeSchema: z.ZodObject<{
    title: z.ZodString;
    imageUrl: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=validation.d.ts.map