export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.sendStatus(401);
    jwt.verify(token, "secretkey", (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSchema } from "./validation.js";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
export const register = async (req, res) => {
    const parseResult = userSchema.safeParse(req.body);
    if (!parseResult.success) {
        const firstIssue = parseResult.error.issues?.[0]?.message || "Validation error";
        return res.status(400).json({ error: firstIssue });
    }
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
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Username already exists' });
        }
        res.status(500).json({ error: 'Registration failed' });
    }
};
export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user)
        return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
        return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ userId: user.id, role: user.role || "regular" }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
};
//# sourceMappingURL=authController.js.map