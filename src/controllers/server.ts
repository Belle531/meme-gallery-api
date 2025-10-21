// --- PostgreSQL Database Version ---

import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';
import authRoutes from '../../routes/authRoutes.js';
import memeRoutes from '../../routes/memeRoutes.js';

// Load environment variables
dotenv.config();

// PostgreSQL client setup
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// Create PostgreSQL connection pool
const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : undefined,
    ssl: { rejectUnauthorized: false } // <-- change here
});

// Middleware to parse incoming JSON data in the request body
app.use(express.json());

// Logging middleware that runs on every request
import type { Request, Response, NextFunction } from "express";
function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
}
app.use(logger);

// Test database connection
pool.connect((err: any, client: any, release: any) => {
    if (err) {
        console.error('Error connecting to PostgreSQL database:', err.stack);
    } else {
        console.log(' Successfully connected to PostgreSQL database');
        release();
    }
});

// --- ROUTES ---

// Route handler for the root URL
app.get('/', (req: Request, res: Response) => {
    res.send('Meme Gallery API By Cassandra Moore ');
});

app.use('/auth', authRoutes);
app.use('/memes', memeRoutes);

// Test route to verify error handling middleware works
app.get("/error-test", (req: Request, res: Response, next: NextFunction) => {
    console.log("ERROR-TEST ROUTE HIT!");
    const error = new Error("Test error");
    console.log("About to call next(error)");
    next(error);
});

// Error handling middleware for malformed JSON (moved to end)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("JSON ERROR HANDLER CALLED, error type:", err.constructor.name);
    if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }
    next(err);
});

// General error-handling middleware (catches all other errors)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("ERROR HANDLER CALLED!");
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// --- SERVER START ---

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Server connected to PostgreSQL database.`);
});

// Sample user data for testing
const sampleUserData = {
  "username": "testuser",
  "password": "testpassword"
 };


// --- LIKE/UNLIKE MEME ROUTE ---
import { authenticateToken } from "./authController.js";
import { PrismaClient } from "@prisma/client";
import { memeSchema as likeSchema } from "./validation.js";
const prisma = new PrismaClient();

app.post("/memes/:id/like", authenticateToken, async (req: Request, res: Response) => {
    const id = req.params.id ?? "";
    const userId = (req as any).user?.userId;
    const parseResult = likeSchema.safeParse({ userId });
    if (!parseResult.success) {
        const firstIssue = parseResult.error.issues?.[0]?.message || "Validation error";
        return res.status(400).json({ error: firstIssue });
    }

    try {
        const existing = await prisma.userLikesMeme.findUnique({
            where: { userId_memeId: { userId, memeId: parseInt(id) } }
        });

        if (existing) {
            await prisma.userLikesMeme.delete({ where: { id: existing.id } });
            return res.json({ message: "Meme unliked" });
        } else {
            await prisma.userLikesMeme.create({
                data: { userId, memeId: parseInt(id) }
            });
            return res.json({ message: "Meme liked" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});


