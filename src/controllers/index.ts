import type { Request, Response } from "express";
import type { Meme } from "../../types/index.js";
import { memeSchema } from "./validation.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addMeme = async (request: Request, response: Response) => {
  const { title, url } = request.body;

  const { error } = memeSchema.safeParse(request.body);
  if (error) {
    throw new Error(error?.issues[0]?.message);
  }

  const newMeme = await prisma.meme.create({
    // @ts-ignore
    data: { title, url, userId: parseInt((request as any).user.userId) } as Meme, // use authenticated userID
  });

  response.status(201).json(newMeme);
};
import express from "express";
import memeRoutes from "../../routes/memeRoutes.js";

const app = express();
app.use(express.json());

app.use("/memes", memeRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
