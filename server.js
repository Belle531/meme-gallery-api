// --- PostgreSQL Database Version ---

import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import memeRoutes from './routes/memeRoutes.js';

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
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false // Required for AWS RDS
    }
});

// Middleware to parse incoming JSON data in the request body
app.use(express.json());

// Logging middleware that runs on every request
function logger(req, res, next) {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
}
app.use(logger);

// Test database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to PostgreSQL database:', err.stack);
    } else {
        console.log(' Successfully connected to PostgreSQL database');
        release();
    }
});

// --- ROUTES ---

// Route handler for the root URL
app.get('/', (req, res) => {
    res.send('Meme Gallery API By Cassandra Moore ');
});

app.use('/auth', authRoutes);
app.use('/memes', memeRoutes);

// Test route to verify error handling middleware works
app.get("/error-test", (req, res, next) => {
    console.log("ERROR-TEST ROUTE HIT!");
    const error = new Error("Test error");
    console.log("About to call next(error)");
    next(error);
});

// Error handling middleware for malformed JSON (moved to end)
app.use((err, req, res, next) => {
    console.log("JSON ERROR HANDLER CALLED, error type:", err.constructor.name);
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }
    next(err);
});

// General error-handling middleware (catches all other errors)
app.use((err, req, res, next) => {
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


