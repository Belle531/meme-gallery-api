import express from "express";
import { getMemes, getMemeById, createMeme, updateMeme, deleteMeme, getUserMemes } from "../controllers/memeController.js";
router.get("/users/:id/memes", getUserMemes);

const router = express.Router();

router.get("/", getMemes);
router.get("/:id", getMemeById);
router.post("/", createMeme);
router.put("/:id", updateMeme);
router.delete("/:id", deleteMeme);

export default router;
