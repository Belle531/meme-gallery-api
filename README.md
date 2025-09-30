# 🎭 Meme Gallery API

A modern REST API for managing memes built with **Express.js** and **Netlify Functions**. Features comprehensive input validation, error handling, and serverless deployment.

By Cassandra Moore

## 🚀 Features

- ✅ **RESTful API** with GET and POST endpoints
- ✅ **Input Validation** - Rejects empty/missing fields
- ✅ **JSON Error Handling** - Catches malformed requests
- ✅ **CORS Support** - Cross-origin requests enabled
- ✅ **ES6+ Features** - Modern JavaScript (modules, destructuring, arrow functions, async/await)
- ✅ **Serverless Deployment** - Netlify Functions ready
- ✅ **Local Development** - Express.js server for testing

## 📡 API Endpoints

### Local Development (Express.js)

- **GET** `http://localhost:3000/memes` - Retrieve all memes
- **POST** `http://localhost:3000/memes` - Add a new meme

### Production (Netlify Functions)

- **GET** `https://your-site-name.netlify.app/api/memes` - Retrieve all memes
- **POST** `https://your-site-name.netlify.app/api/memes` - Add a new meme

## 📋 Request/Response Format

### POST Request Body

```json
{
  "title": "Grumpy Cat",
  "image_url": "https://i.imgur.com/example.jpg",
  "user_id": "cassandra"
}
```

### Response Format

```json
{
  "id": 1,
  "title": "Grumpy Cat",
  "image_url": "https://i.imgur.com/example.jpg",
  "user_id": "cassandra",
  "created_at": "2025-09-29T10:30:00.000Z"
}
```

### Error Response

```json
{
  "error": "title, image_url, and user_id are required fields."
}
```

## 🛠️ Local Development Setup

1. **Clone the repository**

   ```bash

   git clone https://github.com/Belle531/meme-gallery-api.git
   cd meme-gallery-api
   ```

2. **Install dependencies**

   ```bash

   npm install
   ```

3. **Start development server**

   ```bash
   # Express.js server (original)
   npm start
   
   # OR Netlify local development
   npm run dev
   ```

4. **Test the API**
   - Server runs at `http://localhost:3000` (Express) or `http://localhost:8888` (Netlify Dev)
   - Use Postman or curl to test endpoints

## 🚀 Deployment

This project is configured for **Netlify deployment** using serverless functions.

### Deploy via Netlify Website

1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Netlify auto-detects configuration from `netlify.toml`
4. Deploy automatically!

### Deploy via CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 📁 Project Structure

meme-gallery-api/
├── netlify/functions/
│   └── memes.js              # Serverless API functions
├── public/
│   └── index.html            # Landing page
├── netlify.toml              # Netlify configuration
├── package.json              # Dependencies and scripts
├── server.js                 # Express.js server (local dev)
├── DEPLOYMENT.md             # Deployment instructions
└── README.md                 # This file

## 💻 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Deployment**: Netlify Functions (Serverless)
- **Development**: ES6+ JavaScript (modules, destructuring, arrow functions)
- **Validation**: Custom input validation
- **Error Handling**: JSON parsing and HTTP error responses

## 🧪 Testing

### Postman Collection

Import the following requests into Postman:

**GET All Memes:**

- Method: `GET`

- URL: `{{baseURL}}/api/memes`
- Expected: `200 OK` with meme array

**POST New Meme:**

- Method: `POST`

- URL: `{{baseURL}}/api/memes`
- Headers: `Content-Type: application/json`
- Body:

```json
{
  "title": "Drake Pointing",
  "image_url": "https://i.imgur.com/example.jpg",
  "user_id": "your-username"
}

- Expected: `201 Created` with new meme object

**Error Testing:**
- Method: `POST`
- URL: `{{baseURL}}/api/memes`
- Body: `{}` (empty)
- Expected: `400 Bad Request` with error message

### cURL Examples

```bash
# GET all memes
curl https://your-site-name.netlify.app/api/memes

# POST new meme
curl -X POST https://your-site-name.netlify.app/api/memes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Meme","image_url":"https://example.com/meme.jpg","user_id":"test"}'

# Test error handling
curl -X POST https://your-site-name.netlify.app/api/memes \
  -H "Content-Type: application/json" \
  -d '{}'
```

## 🔒 API Validation Rules

### Required Fields

All POST requests must include:

- `title` (string, non-empty)
- `image_url` (string, valid URL format)
- `user_id` (string/number, non-empty)

### Response Codes

- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `400 Bad Request` - Missing required fields or invalid JSON
- `405 Method Not Allowed` - Unsupported HTTP method
- `500 Internal Server Error` - Server error

## 🌟 ES6+ Features Showcase

This project demonstrates modern JavaScript features:

```javascript
// ES6 Modules
import express from 'express';

// Destructuring Assignment
const { title, image_url, user_id } = req.body;

// Arrow Functions
app.get("/memes", (req, res) => {
  res.json(memes);
});

// Template Literals
console.log(`Server running at http://localhost:${PORT}`);

// Object Property Shorthand
const newMeme = { id, title, image_url, user_id };

// Async/Await (in database version)
const result = await pool.query('SELECT * FROM memes');
```

## 🏗️ Architecture

 Local Development (Express.js)

Client Request → Express Server → In-Memory Array → JSON Response

 Production (Netlify Functions)

Client Request → Netlify CDN → Serverless Function → In-Memory Array → JSON Response

### Database Version (Optional)

Client Request → API → PostgreSQL Database → JSON Response

## 📊 Performance Considerations

- **Serverless Functions**: Cold start ~100-500ms, warm ~10-50ms
- **In-Memory Storage**: Fast but data resets on function restart
- **CORS Enabled**: Supports cross-origin requests from web apps
- **JSON Validation**: Prevents malformed request processing

## 🚧 Roadmap & Future Enhancements

- [ ] Database persistence (PostgreSQL/MongoDB)
- [ ] User authentication & authorization
- [ ] Image upload functionality
- [ ] Meme categories and tags
- [ ] Search and filtering endpoints
- [ ] Rate limiting and API keys
- [ ] Automated testing suite
- [ ] API documentation with Swagger

## 🐛 Troubleshooting

### Common Issues

"Cannot find package 'pg'"**

- Solution: Run `npm install pg dotenv` to install missing dependencies

**"Database connection error"

- Check your `.env` file has correct database credentials
- For local testing, use the in-memory version in `server.js`

**"404 Not Found on /api/memes"*

- Ensure you're using the correct URL format
- Local: `http://localhost:3000/memes` (Express) or `http://localhost:8888/api/memes` (Netlify Dev)
- Production: `https://your-site.netlify.app/api/memes`

**CORS Errors

- CORS headers are pre-configured in Netlify functions
- For Express version, ensure CORS middleware is properly set up

## 📞 Support

For questions or issues:

- Open an issue on GitHub

- Contact: [Your Email]
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- Built as part of a REST API learning project
- Uses Netlify Functions for serverless deployment
- Inspired by modern web development best practices

## 📝 License

ISC

## 👩‍💻 Author

**Cassandra Moore** - Full Stack Developer
