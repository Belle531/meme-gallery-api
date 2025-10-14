import express from "express";
import { getMemes, getMemeById, createMeme, updateMeme, deleteMeme, getUserMemes } from "../controllers/memeController.js";
import { authenticateToken } from "../controllers/authController.js";

const router = express.Router();

router.get("/users/:id/memes", getUserMemes);
router.get("/", getMemes);
router.get("/:id", getMemeById);
router.post("/", authenticateToken, createMeme);
router.put("/:id", updateMeme);
router.delete("/:id", deleteMeme);

export default router;
