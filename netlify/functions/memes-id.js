// In-memory array to simulate data storage (will reset on each function call)
let memes = [
    { id: 1, title: "Distracted Boyfriend", image_url: "https://i.imgur.com/example1.jpg", user_id: "system" },
    { id: 2, title: "Success Kid", image_url: "https://i.imgur.com/example2.jpg", user_id: "system" }
];

// Netlify Function Handler for individual meme lookup
exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
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
        // Only handle GET requests
        if (event.httpMethod === 'GET') {
            // Extract the ID from the path
            // Path will be like /.netlify/functions/memes-id?id=1
            const urlParams = new URLSearchParams(event.rawQuery || '');
            const id = urlParams.get('id') || event.queryStringParameters?.id;

            if (!id) {
                return {
                    statusCode: 400,
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ error: 'ID parameter is required' })
                };
            }

            // Find the meme with the matching ID (convert string to number)
            const meme = memes.find((m) => m.id === parseInt(id));

            // If meme not found, return 404 error
            if (!meme) {
                return {
                    statusCode: 404,
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ error: 'Meme not found' })
                };
            }

            // Return the found meme
            return {
                statusCode: 200,
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(meme)
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