import express from "express";
import { getMemes, getMemeById, createMeme, updateMeme, deleteMeme, getUserMemes } from "../controllers/memeController.js";
import { authenticateToken } from "../controllers/authController.js";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const router = express.Router();

// Use type assertion for req.user
router.get("/users/:id/memes", getUserMemes);
router.get("/", getMemes);
router.get("/:id", getMemeById);
router.post("/", authenticateToken, createMeme);
router.put("/:id", updateMeme);
router.delete("/:id", deleteMeme);

// Like/Unlike Meme Route using Zod
const likeSchema = z.object({
  userId: z.number()
});

// Remove unused interface

router.post("/:id/like", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = (req as any).user?.userId;
  const memeId = parseInt(id ?? "");
  const parseResult = likeSchema.safeParse({ userId });
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.issues[0]?.message || "Validation error" });
  }

  try {
    const existing = await prisma.userLikesMeme.findUnique({
      where: { userId_memeId: { userId, memeId } }
    });

    if (existing) {
      await prisma.userLikesMeme.delete({ where: { id: existing.id } });
      return res.json({ message: "Meme unliked" });
    } else {
      await prisma.userLikesMeme.create({
        data: { userId, memeId }
      });
      return res.json({ message: "Meme liked" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

