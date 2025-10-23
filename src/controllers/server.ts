import express from "express";
import dotenv from "dotenv";
import memeRoutes from "../routes/memeRoutes.js";
import authRoutes from "../routes/authRoutes.js";

dotenv.config();


const app = express();
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use("/memes", memeRoutes);
app.use("/auth", authRoutes);

// Error-handling middleware
import type { Request, Response, NextFunction } from "express";

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


