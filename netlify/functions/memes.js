// In-memory array to simulate data storage (will reset on each function call)
let memes = [
    { id: 1, title: "Distracted Boyfriend", image_url: "https://i.imgur.com/example1.jpg", user_id: "system" },
    { id: 2, title: "Success Kid", image_url: "https://i.imgur.com/example2.jpg", user_id: "system" }
];

// Netlify Function Handler
exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // GET /api/memes → return all memes
        if (event.httpMethod === 'GET') {
            return {
                statusCode: 200,
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(memes)
            };
        }

        // POST /api/memes → add a new meme
        if (event.httpMethod === 'POST') {
            let requestBody;
            
            // Parse and validate JSON
            try {
                requestBody = JSON.parse(event.body || '{}');
            } catch (parseError) {
                return {
                    statusCode: 400,
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ error: 'Invalid JSON format in request body' })
                };
            }

            // Destructure and validate required fields
            const { title, image_url, user_id } = requestBody;

            if (!title || !image_url || !user_id) {
                return {
                    statusCode: 400,
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ error: "title, image_url, and user_id are required fields." })
                };
            }

            // Create new meme
            const newMeme = {
                id: memes.length > 0 ? memes[memes.length - 1].id + 1 : 1,
                title,
                image_url,
                user_id,
                created_at: new Date().toISOString()
            };

            // Add to array
            memes.push(newMeme);

            return {
                statusCode: 201,
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMeme)
            };
        }

        // Method not allowed
        return {
            statusCode: 405,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};