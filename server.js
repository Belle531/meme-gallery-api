// --- WARNING: This version uses an in-memory array and does NOT connect to the database ---

import express from 'express';
// We don't need 'dotenv' or 'pg' since we are using a local array.

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON data in the request body
app.use(express.json());

// Logging middleware that runs on every request
function logger(req, res, next) {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
}
app.use(logger);

// In-memory array to simulate data storage
let memes = [
    { id: 1, title: "Distracted Boyfriend", image_url: "https://i.imgur.com/example1.jpg", user_id: "system" },
    { id: 2, title: "Success Kid", image_url: "https://i.imgur.com/example2.jpg", user_id: "system" }
];

// --- ROUTES ---

// Route handler for the root URL
app.get('/', (req, res) => {
    res.send('Meme Gallery API By Cassandra Moore ');
});

// GET /memes → return all memes from the local array
app.get("/memes", (req, res) => {
    // Return the current contents of the memes array
    res.json(memes);
});

// GET /memes/:id → return a single meme by ID
app.get("/memes/:id", (req, res) => {
    // Extract the id parameter from the URL
    const { id } = req.params;
    
    // Find the meme with the matching ID (convert string to number)
    const meme = memes.find((m) => m.id === parseInt(id));
    
    // If meme not found, return 404 error
    if (!meme) {
        return res.status(404).json({ error: "Meme not found" });
    }
    
    // Return the found meme
    res.json(meme);
});

// POST /memes → add a meme to the local array
app.post("/memes", (req, res) => {
    // Destructure required fields from the request body
    const { title, image_url, user_id } = req.body; 

    // Validation: Check if all required fields are present
    // NOTE: I'm using image_url and user_id to match the structure we'll use for the database
    if (!title || !image_url || !user_id) {
        return res.status(400).json({ error: "title, image_url, and user_id are required fields." });
    }
    
    // Create a new meme object with a calculated ID and current timestamp
    const newMeme = { 
        id: memes.length > 0 ? memes[memes.length - 1].id + 1 : 1, 
        title, 
        image_url, 
        user_id,
        created_at: new Date().toISOString()
    };
    
    // Add the new meme to the in-memory array
    memes.push(newMeme);
    
    // Return the newly created meme with 201 status
    res.status(201).json(newMeme);
});

// Test route to verify error handling middleware works
app.get("/error-test", (req, res) => {
    console.log("ERROR-TEST ROUTE HIT!");
    throw new Error("Test error");
});

// Error handling middleware for malformed JSON (moved to end)
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }
    next();
});

// General error-handling middleware (catches all other errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// --- SERVER START ---

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`⚠️ WARNING: Server is using local memory, not the database.`);
});
