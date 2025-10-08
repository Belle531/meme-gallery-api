// --- PostgreSQL Database Version ---

import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';

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
        console.log('✅ Successfully connected to PostgreSQL database');
        release();
    }
});

// --- ROUTES ---

// Route handler for the root URL
app.get('/', (req, res) => {
    res.send('Meme Gallery API By Cassandra Moore ');
});

// GET /memes → return all memes from the database
app.get("/memes", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM memes ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching memes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /memes/:id → return a single meme by ID
app.get("/memes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // Query database for meme with specific ID
        const result = await pool.query('SELECT * FROM memes WHERE id = $1', [parseInt(id)]);
        
        // If meme not found, return 404 error
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Meme not found" });
        }
        
        // Return the found meme
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching meme:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /memes → add a meme to the database
app.post("/memes", async (req, res) => {
    try {
        // Destructure required fields from the request body
        const { title, url, user_id } = req.body; 

        // Validation: Check if all required fields are present
        if (!title || !url || !user_id) {
            return res.status(400).json({ error: "title, url, and user_id are required fields." });
        }
        
        // Insert new meme into database
        const result = await pool.query(
            'INSERT INTO memes (title, url, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, url, parseInt(user_id)]
        );
        
        // Return the newly created meme with 201 status
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating meme:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /memes/:id → update a meme by ID
app.put("/memes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, url } = req.body;
        
        // Check if meme exists
        const existingMeme = await pool.query('SELECT * FROM memes WHERE id = $1', [parseInt(id)]);
        
        if (existingMeme.rows.length === 0) {
            return res.status(404).json({ error: "Meme not found" });
        }

        // Update meme in database
        const result = await pool.query(
            'UPDATE memes SET title = COALESCE($1, title), url = COALESCE($2, url) WHERE id = $3 RETURNING *',
            [title, url, parseInt(id)]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating meme:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /memes/:id → remove a meme by ID
app.delete("/memes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // Delete meme from database and return the deleted meme
        const result = await pool.query('DELETE FROM memes WHERE id = $1 RETURNING *', [parseInt(id)]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Meme not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting meme:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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
    console.log(`✅ Server connected to PostgreSQL database.`);
});


