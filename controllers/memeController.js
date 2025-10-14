import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword }
    });
    res.status(201).json({ id: user.id, username: user.username });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}

export const getUserMemes = async (req, res) => {
  const { id } = req.params;
  try {
    const userWithMemes = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { memes: true }
    });
    if (!userWithMemes) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(userWithMemes.memes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


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
  const { title, url } = req.body;
  const userId = req.user.userId;
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
