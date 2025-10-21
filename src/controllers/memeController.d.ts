import type { Request, Response } from "express";
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserMemes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMemes: (req: Request, res: Response) => Promise<void>;
export declare const getMemeById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createMeme: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateMeme: (req: Request, res: Response) => Promise<void>;
export declare const deleteMeme: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=memeController.d.ts.map