# 🚀 Netlify Deployment Guide

## 📁 Project Structure

```text
meme-gallery-api/
├── netlify/functions/
│   └── memes.js          # API endpoints as serverless functions
├── public/
│   └── index.html        # Landing page
├── netlify.toml          # Netlify configuration
├── package.json          # Dependencies and scripts
├── server.js             # Original Express server (for local dev)
└── DEPLOYMENT.md         # This file
```

## 🔧 Setup Steps

### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
# OR install locally as dev dependency (already added to package.json)
npm install
```

### 2. Login to Netlify

```bash
netlify login
```

### 3. Initialize Netlify Site

```bash
netlify init
```

### 4. Local Development

```bash
npm run dev
# This runs: netlify dev
# Your API will be available at: http://localhost:8888
```

### 5. Deploy to Netlify

```bash
# Deploy to preview
npm run deploy

# Deploy to production
npm run deploy:prod
```

## 🌐 API Endpoints (After Deployment)

Your live API will be available at: `https://your-site-name.netlify.app`

- **GET** `/api/memes` - Get all memes
- **POST** `/api/memes` - Add a new meme

### Example Usage

```bash
# GET all memes
curl https://your-site-name.netlify.app/api/memes

# POST new meme
curl -X POST https://your-site-name.netlify.app/api/memes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Meme","image_url":"https://example.com/meme.jpg","user_id":"cassandra"}'
```

## 📝 Testing in Postman

Update your Postman requests to use the live URL:

- Base URL:`https://your-site-name.netlify.app`

- GET: `https://your-site-name.netlify.app/api/memes`

- POST: `https://your-site-name.netlify.app/api/memes`

## ⚠️ Important Notes

1. **Data Persistence**: Netlify Functions are stateless, so the in-memory array resets with each function invocation. For production, you'd want to use a database.

2. **CORS**: Already configured in the functions for cross-origin requests.

3. **Error Handling**: Includes JSON parsing errors and input validation.

4. **ES6+ Features**: Uses destructuring, arrow functions, async/await, template literals, and modules.

## 🎯 Deliverable Checklist

- ✅ Working GET /memes endpoint
- ✅ Working POST /memes endpoint  
- ✅ Input validation (rejects empty fields)
- ✅ JSON error handling
- ✅ ES6+ features implemented
- ✅ Ready for Netlify deployment
- 🔄 Deploy and get live URL
