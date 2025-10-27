# Meme Gallery API

A RESTful API for managing memes, users, and likes. Built with Node.js, Express, PostgreSQL, Prisma ORM, JWT authentication, Zod validation, and TypeScript. Includes a Vite-powered React frontend.

## Features

- User registration and login (JWT authentication)
- CRUD operations for memes
- Like/unlike memes (many-to-many relationship)
- Input validation with Zod
- Strongly-typed backend and frontend (TypeScript)
- Prisma ORM for database modeling
- Comprehensive API documentation
- Ready for deployment (Netlify, Vercel, AWS, etc.)

## Project Structure

```text
meme-gallery-api/
├── controllers/
├── routes/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── validation.js
├── server.js
├── index.js
├── package.json
├── tsconfig.json
├── .env.example
├── README.md
└── ...
```

## Local Setup

1. Clone the repository

  ```bash
  git clone https://github.com/Belle531/meme-gallery-api.git
  cd meme-gallery-api
  ```

2.Install dependencies

  ```bash
  npm install
  ```

3.Configure environment variables

  -Copy `.env.example` to `.env` and fill in your secrets.

4.Generate Prisma client

  ```bash
  npx prisma generate
  ```

5.Run migrations

  ```bash
  npx prisma migrate dev
  ```

6.(Optional) Seed database

  ```bash
  node prisma/seed.js
  ```

7.Start the server

  ```bash
  npm start
  ```

## Deployment

Deploy to Netlify, Vercel, or AWS. Set environment variables in your deployment dashboard. Example URLs:

- Backend: `https://your-site-name.netlify.app/api`
- Frontend: `https://your-site-name.netlify.app/`

## API Endpoints

### Auth

#### Register

`POST /api/register`

Request body:

```json
{
  "username": "testuser",
  "password": "yourpassword"
}
```

#### Login

`POST /api/login`

Request body:

```json
{
  "username": "testuser",
  "password": "yourpassword"
}
```

Response:

```json
{
  "token": "<JWT_TOKEN>"
}
```

### Memes

#### Get all memes

`GET /api/memes`

#### Get meme by ID

`GET /api/memes/:id`

#### Create meme

`POST /api/memes`

Request body:

```json
{
  "title": "Success Kid",
  "url": "https://i.imgur.com/example2.jpg",
  "userId": 1
}
```

#### Update meme

`PUT /api/memes/:id`

Request body:

```json
{
  "title": "Updated Meme Title"
}
```

#### Delete meme

`DELETE /api/memes/:id`

### Likes

#### Like a meme

`POST /api/memes/:id/like`

#### Unlike a meme

`POST /api/memes/:id/unlike`

## Example Requests

```bash
# GET all memes
curl https://your-site-name.netlify.app/api/memes

# GET single meme by ID
curl https://your-site-name.netlify.app/api/memes/1

# GET non-existent meme (404 test)
curl https://your-site-name.netlify.app/api/memes/999

# POST new meme
curl -X POST https://your-site-name.netlify.app/api/memes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Meme","url":"https://example.com/meme.jpg","userId":1}'

# Test error handling
curl -X POST https://your-site-name.netlify.app/api/memes \
  -H "Content-Type: application/json" \
  -d '{}'
```

## TypeScript & Coding Patterns

```javascript
// ES6 Modules
import express from 'express';

// Destructuring Assignment
const { title, url, userId } = req.body;

// Arrow Functions
app.get("/memes", (req, res) => {
  res.json(memes);
});

// Template Literals
console.log(`Server running at http://localhost:${PORT}`);

// Object Property Shorthand
const newMeme = { id, title, url, userId };

// Async/Await (in database version)
const result = await pool.query('SELECT * FROM memes');
```

## Styling (Frontend)

```css
/* Key CSS Variables */

# 🎭 Meme Gallery API

A RESTful API for managing a meme gallery with user authentication, built with Express.js and PostgreSQL on AWS RDS.

## 🔗 GitHub Repository

[https://github.com/Belle531/meme-gallery-api](https://github.com/Belle531/meme-gallery-api)

## 🧬 Prisma ORM Integration

- **Database Access:** All CRUD operations are now handled via Prisma ORM, connecting Express directly to AWS RDS PostgreSQL.
- **Models:** Prisma models for `User` and `Meme` are defined in `prisma/schema.prisma` and kept in sync with the database.
- **Seeding:** Example seed script (`prisma/seed.js`) demonstrates inserting sample users and memes using Prisma.

By Cassandra Moore

## 🏗️ Architecture

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL on AWS RDS
- **Environment**: Environment variables for secure configuration

## 🗄️ AWS RDS Database Configuration (via Prisma)

### RDS Endpoint Information

Host: meme-gallery-api.c4xe62c8cx3r.us-east-1.rds.amazonaws.com  
Port: 5432  
Database: meme_gallery  
User: postgres

*Note: Password not included for security reasons

### Database Schema

The database consists of two main tables:

- **users**: Stores user account information (id, username, password, created_at)
- **memes**: Stores meme entries with foreign key references to users (id, title, url, user_id, created_at)

See `schema.sql` for complete table definitions.

## 📊 Database Files Included

### schema.sql

Contains the CREATE TABLE statements for:

- `users` table with proper constraints and indexes
- `memes` table with foreign key references
- Performance indexes and table comments

### crud.sql

Contains comprehensive CRUD operation examples:

- **CREATE**: INSERT statements for sample users and memes
- **READ**: Various SELECT queries including joins, filtering, and aggregation
- **UPDATE**: UPDATE statements for modifying existing records
- **DELETE**: DELETE statements with proper constraint handling

## 🚀 Features

- ✅ **Prisma ORM** - All database queries use Prisma for type safety and maintainability

- ✅ **PostgreSQL Database** - AWS RDS hosted database with SSL connectivity
- ✅ **RESTful API** - Full CRUD operations for memes and users
- ✅ **Request Logging Middleware** - Logs all API requests with timestamps
- ✅ **Centralized Error Handling** - Custom error middleware with stack trace logging
- ✅ **Input Validation** - Rejects empty/missing fields with proper validation
- ✅ **SQL Injection Protection** - Parameterized queries for security
- ✅ **Environment Variables** - Secure configuration management
- ✅ **Foreign Key Constraints** - Database integrity enforcement

## 📡 API Endpoints (Prisma-powered)

### CRUD Endpoints (Prisma + AWS RDS)

- **CREATE**: `POST /memes` — Add a new meme. Request body:
json
  {
    "title": "Success Kid",
    "url": "[https://i.imgur.com/example2.jpg]",
    "userId": 1
  }

  Returns: Created meme object with `id`, `title`, `url`, `user_id`, and `created_at`.

- **READ**: `GET /memes` — Returns an array of memes with their user info.
- **READ by ID**: `GET /memes/:id` — Returns a single meme object with user info.
- **UPDATE**: `PUT /memes/:id` — Update meme details. Request body:
json
  {
    "title": "Updated Meme Title"
  }
  Returns: Updated meme object.
- **DELETE**: `DELETE /memes/:id` — Removes the meme from the database. Returns deleted meme object.

- All changes are instantly reflected in AWS RDS and can be verified with direct SQL queries (e.g., `SELECT * FROM memes;`).

### Local Development & Production (Express.js on Render)

- **GET** `/memes` - Retrieve all memes
- **GET** `/memes/:id` - Retrieve single meme by ID
- **POST** `/memes` - Add a new meme
- **PUT** `/memes/:id` - Update a meme
- **DELETE** `/memes/:id` - Delete a meme
- **GET** `/error-test` - Test error handling middleware

**Local:** `http://localhost:8080/`  
**Production:** `https://your-app-name.onrender.com/`

## 🎨 Landing Page Design

The API includes a custom-designed landing page at the root URL with enhanced visual aesthetics:

### **Visual Theme:**

- **Background**: Dark blue (#3107ee) for modern tech aesthetic
- **Container**: Light purple (rgb(201, 196, 235)) for elegant contrast
- **Typography**: Monospace font family ('Courier New', Monaco) for developer-focused design
- **Layout**: Responsive design with centered content and subtle shadows

### **Features:**

- ✅ **Interactive Documentation** - Live API endpoint examples
- ✅ **Real Meme Preview** - Visual demonstration of API responses
- ✅ **Professional Branding** - Custom color scheme and typography
- ✅ **Mobile Responsive** - Optimized for all screen sizes
- ✅ **Developer-Focused** - Code-style fonts and tech aesthetic

### **Technical Implementation:**

```css
/* Key CSS Variables */
```

### **Access Points:**

- **Local Development**: `http://localhost:8080/`
- **Production**: `https://meme-gallery-api.netlify.app/`

## 📋 Request/Response Format

## 🛠️ Local Development Setup

### Prisma Setup

1. Install dependencies

  ```bash
  npm install
 
2. Generate Prisma client
  ```bash
  npx prisma generate

3. Run migrations
  ```bash
  npx prisma migrate dev

4. (Optional) Seed database
  ```bash
  node prisma/seed.js
  ```

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
   npm start
   ```

  -Server runs at `http://localhost:8080`
   -Use Postman or curl to test endpoints

## 🚀 Deployment

Express API is deployed to Render and connects to AWS RDS using Prisma ORM.

This project is configured for **Render deployment** using Express.js and PostgreSQL.

### Deploy via Render

1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service and select your repo
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables from your `.env` file
7. Deploy and get your live URL!

## 📁 Project Structure

meme-gallery-api/  
├── public/  
│   └── index.html            # Landing page  
├── package.json              # Dependencies and scripts  
├── server.js                 # Express.js server  
├── schema.sql                # Database schema  
├── crud.sql                  # Sample CRUD operations  
├── .env                      # Environment variables (not committed)  
├── .env.example              # Example environment file  
└── README.md                 # This file

## 💻 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Deployment**: Render (Web Service)
- **Development**: ES6+ JavaScript (modules, destructuring, arrow functions)
- **Validation**: Custom input validation
- **Error Handling**: JSON parsing and HTTP error responses

## 🛡️ Middleware Features

### Request Logging Middleware

Every API request is automatically logged to the console with detailed information:

```javascript
function logger(req, res, next) {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
}
```

**Sample Console Output:**

```bash
GET /memes at 2025-10-01T01:38:13.085Z
POST /memes at 2025-10-01T01:39:45.234Z
GET /memes/1 at 2025-10-01T01:40:12.567Z
```

### Centralized Error Handling

Comprehensive error handling middleware catches and processes all errors:

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
```

**Features:**

- ✅ **Stack Trace Logging** - Full error details logged to console for debugging
- ✅ **Generic Client Responses** - User-friendly error messages (no sensitive info exposed)
- ✅ **JSON Error Handling** - Special handling for malformed JSON requests
- ✅ **Consistent Error Format** - All errors return standardized JSON responses

### Error Testing Endpoint

Test the error handling system with a dedicated endpoint:

- **GET** `/error-test` - Triggers a test error to verify middleware functionality
- **Response**: `500 Internal Server Error` with `{"error": "Something went wrong!"}`
- **Console**: Full error stack trace logged for debugging

## 🧪 Testing

### Middleware Testing

**Test Request Logging:**

1. Make any API request (GET `/memes`, POST `/memes`, etc.)
2. Check console for log entry: `METHOD /path at TIMESTAMP`

**Test Error Handling:**

1. Send GET request to `/error-test`
2. Verify 500 response: `{"error": "Something went wrong!"}`
3. Check console for error stack trace

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
```

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

# GET single meme by ID
curl https://your-site-name.netlify.app/api/memes/1

# GET non-existent meme (404 test)
curl https://your-site-name.netlify.app/api/memes/999

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
- `404 Not Found` - Meme ID not found (GET `/memes/:id`)
- `405 Method Not Allowed` - Unsupported HTTP method
- `500 Internal Server Error` - Server error (caught by error middleware)

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

## Architecture

Client Request → Express Server → PostgreSQL Database → JSON Response

## 📊 Performance Considerations

- **Database Storage**: Persistent data in PostgreSQL
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
- Local: `http://localhost:8080/memes` (Express) or `http://localhost:8888/api/memes` (Netlify Dev)
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
