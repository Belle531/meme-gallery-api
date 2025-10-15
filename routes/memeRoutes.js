import express from "express";
import { getMemes, getMemeById, createMeme, updateMeme, deleteMeme, getUserMemes } from "../controllers/memeController.js";
import { authenticateToken } from "../controllers/authController.js";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const router = express.Router();

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

router.post("/:id/like", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const parseResult = likeSchema.safeParse({ userId: req.user.userId });
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors[0].message });
  }

  try {
    const existing = await prisma.userLikesMeme.findUnique({
      where: { userId_memeId: { userId: req.user.userId, memeId: parseInt(id) } }
    });

    if (existing) {
      await prisma.userLikesMeme.delete({ where: { id: existing.id } });
      return res.json({ message: "Meme unliked" });
    } else {
      await prisma.userLikesMeme.create({
        data: { userId: req.user.userId, memeId: parseInt(id) }
      });
      return res.json({ message: "Meme liked" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
