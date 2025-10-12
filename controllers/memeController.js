
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const getMemes = async (req, res) => {
  try {
    const memes = await prisma.meme.findMany({ include: { user: true } });
    res.json(memes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch memes' });
  }
};


export const getMemeById = async (req, res) => {
  const { id } = req.params;
  try {
    const meme = await prisma.meme.findUnique({
      where: { id: parseInt(id) },
      include: { user: true }
    });
    if (!meme) return res.status(404).json({ error: 'Meme not found' });
    res.json(meme);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch meme' });
  }
};


export const createMeme = async (req, res) => {
  const { title, url, userId } = req.body;
  try {
    const newMeme = await prisma.meme.create({
      data: { title, url, userId }
    });
    res.status(201).json(newMeme);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create meme' });
  }
};


export const updateMeme = async (req, res) => {
  const { id } = req.params;
  const { title, url } = req.body;
  try {
    const meme = await prisma.meme.update({
      where: { id: parseInt(id) },
      data: { title, url }
    });
    res.json(meme);
  } catch (error) {
    res.status(404).json({ error: 'Meme not found or failed to update' });
  }
};


export const deleteMeme = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.meme.delete({
      where: { id: parseInt(id) }
    });
    res.json(deleted);
  } catch (error) {
    res.status(404).json({ error: 'Meme not found or failed to delete' });
  }
};
