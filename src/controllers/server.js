import express from "express";
import dotenv from "dotenv";
import memeRoutes from "../routes/memeRoutes.js";
import authRoutes from "../routes/authRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/memes", memeRoutes);
app.use("/auth", authRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map