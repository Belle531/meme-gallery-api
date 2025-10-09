# 🚀 Complete Development Environment Setup Guide

**Step-by-step guide to start your server with pgAdmin 4 and Postman*

## 🗂️ **Overview: Your Development Stack**

PostgreSQL Database (AWS RDS) ← pgAdmin 4 (Database Management)
         ↑
Express.js API Server ← Postman (API Testing)

---

## 📋 **Step 1: Start pgAdmin 4 (Database Management)**

### **1.1 Launch pgAdmin 4:**

- **Windows**: Search for "pgAdmin 4" in Start Menu → Click to open
- **Alternative**: Look for pgAdmin icon on desktop or taskbar

### **1.2 Set Master Password (if prompted):**

- Enter your pgAdmin master password
- This is different from your database password

### **1.3 Connect to Your AWS RDS Database:**

#### **Add New Server Connection:**

1. **Right-click "Servers"** in left panel → **"Create" → "Server..."**
2. **Fill in Connection Details:**

**General Tab:**

- **Name**: `Meme Gallery AWS RDS` (or any name you prefer)

**Connection Tab:**

- **Host name/address**: `meme-gallery-api.c4xe62c8cx3r.us-east-1.rds.amazonaws.com`
- **Port**: `5432`
- **Maintenance database**: `meme_gallery`
- **Username**: `postgres`
- **Password**: `G5RDHMbq0e5yJalKYfjh` (your actual password)
- **Save password?**: ✅ Check this box

**SSL Tab:**

- **SSL mode**: `Require`

3 **Click "Save"**

### **1.4 Verify Connection:**

- You should see your server appear in the left panel
- **Expand**: `Servers → Meme Gallery AWS RDS → Databases → meme_gallery → Schemas → public → Tables`
- **You should see**: `users` and `memes` tables

---

## 📋 **Step 2: Start Your Local Development Server**

### **2.1 Open Terminal/Command Prompt:**

- **Windows**: Press `Win + R` → type `cmd` → Enter
- **Alternative**: Open VS Code → Terminal → New Terminal

### **2.2 Navigate to Your Project:**

```bash
cd C:/Users/cassa/Documents/meme-gallery-api
```

### **2.3 Verify Environment Variables:**

```bash
# Check if .env file exists and has correct content
type .env
```

**Should show:**

PGHOST=meme-gallery-api.c4xe62c8cx3r.us-east-1.rds.amazonaws.com
PGUSER=postgres
PGPASSWORD=your-password-here
PGDATABASE=meme_gallery
PGPORT=5432

⚠️ **Important**: Replace `your-password-here` with your actual password: `G5RDHMbq0e5yJalKYfjh`

### **2.4 Start the Server:**

```bash
npm start
```

### **2.5 Verify Server Started Successfully:**

Look for these messages:

Server is running at [http://localhost:3000]
✅ Successfully connected to PostgreSQL database
✅ Server connected to PostgreSQL database
✅ **Success Indicator**: If you see these messages, your server is running and connected to the database!

---

## 📋 **Step 3: Launch Postman (API Testing)**

### **3.1 Open Postman:**

- **Desktop App**: Click Postman icon
- **Web Version**: Go to [https://web.postman.co/]
- **Sign in** to your account if needed

### **3.2 Create New Collection:**

1. **Click "Collections"** in left sidebar
2. **Click "+ Create Collection"**
3. **Name it**: "Meme Gallery API Tests"
4. **Click "Create"**

### **3.3 Set Up Environment Variables:**

1. **Click gear icon** (top right) → **"Manage Environments"**
2. **Click "Add"**
3. **Environment Name**: "Local Development"
4. **Add Variable**:
   - **Variable**: `baseURL`
   - **Initial Value**: `http://localhost:3000`
   - **Current Value**: `http://localhost:3000`
5. **Click "Add"** → **"Close"**
6. **Select "Local Development"** from environment dropdown (top right)

---

## 📋 **Step 4: Test All Components Working Together**

### **4.1 Test Database Connection (pgAdmin 4):**

1. **In pgAdmin**: Right-click `memes` table → **"View/Edit Data" → "All Rows"**
2. **You should see**: Your sample memes data
3. **Try a query**: Click **"Query Tool"** → Run: `SELECT * FROM memes;`

### **4.2 Test API Server (Postman):**

#### **Test 1: Root Endpoint**

1. **New Request**: Click "+ New" → "Request"
2. **Request Name**: "Get Root"
3. **Method**: `GET`
4. **URL**: `{{baseURL}}/`
5. **Click "Send"**
6. **Expected Response**: `"Meme Gallery API By Cassandra Moore"`

#### **Test 2: Get All Memes**

1. **New Request**: "Get All Memes"
2. **Method**: `GET`
3. **URL**: `{{baseURL}}/memes`
4. **Click "Send"**
5. **Expected**: JSON array with memes from database

#### **Test 3: Get Single Meme**

1. **New Request**: "Get Single Meme"
2. **Method**: `GET`
3. **URL**: `{{baseURL}}/memes/4`
4. **Click "Send"**
5. **Expected**: Single meme object

#### **Test 4: Create New Meme**

1. **New Request**: "Create New Meme"
2. **Method**: `POST`
3. **URL**: `{{baseURL}}/memes`
4. **Headers Tab**:
   - **Key**: `Content-Type`
   - **Value**: `application/json`
5. **Body Tab**: Select "raw" → "JSON"

6. **Body Content**:

```json
{
  "title": "Test Meme from Postman",
  "url": "https://example.com/test-meme.jpg",
  "user_id": 1
}

7. **Click "Send"**

8. **Expected**: 201 Created with new meme object

### **4.3 Verify Database Updated (pgAdmin 4):**
1. **Refresh memes table** in pgAdmin
2. **Check**: Your new meme should appear in the database
3. **This confirms**: API → Database connection is working perfectly!

---

## 🚨 **Troubleshooting Common Issues**

### **Issue: Server Won't Start**
**Error**: `listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Kill existing process
taskkill //F //PID [process_id]

# Or use different port
set PORT=3001
npm start
```

### **Issue: Database Connection Failed**

**Error**: `Error connecting to PostgreSQL database`

**Solutions**:

1. **Check .env file** - Ensure password is correct (not placeholder)
2. **Verify AWS RDS** - Check if database is running in AWS console
3. **Check internet connection** - AWS RDS requires internet access
4. **Test in pgAdmin first** - If pgAdmin can't connect, fix that first

### **Issue: pgAdmin Won't Connect**

**Error**: `could not connect to server`

**Solutions**:

1. **Check credentials** - Verify host, username, password
2. **SSL requirement** - Ensure SSL mode is "Require"
3. **Firewall/Network** - Check if your network blocks port 5432
4. **AWS RDS status** - Verify database is "Available" in AWS console

### **Issue: Postman Not Getting Responses**

**Error**: `Could not get any response`

**Solutions**:

1. **Check server is running** - Look for success messages in terminal
2. **Verify URL** - Ensure `http://localhost:3000` (not https)
3. **Check firewall** - Some antivirus blocks local connections
4. **Try browser first** - Visit `http://localhost:3000` in browser

---

## ✅ **Success Checklist**

### **When Everything is Working:**

- [ ] **pgAdmin 4** connects to AWS RDS and shows your tables
- [ ] **Server terminal** shows successful database connection messages
- [ ] **Postman GET /memes** returns JSON array from database
- [ ] **Postman POST /memes** creates new meme in database
- [ ] **pgAdmin refresh** shows the new meme you created via API

### **You'll Know It's Working When:**

1. **Data flows freely**: Postman → API → Database → pgAdmin
2. **No error messages** in server terminal
3. **Consistent data** between Postman responses and pgAdmin tables
4. **New memes appear** in both Postman and database after POST requests

---

## 🎯 **Daily Development Workflow**

### **Starting Your Development Session:**

1. **Start pgAdmin 4** (if you want to monitor database)
2. **Open terminal** → Navigate to project folder
3. **Verify .env file** has correct password
4. **Run `npm start`** → Wait for success messages
5. **Open Postman** → Select "Local Development" environment
6. **Test basic endpoint** (`GET /memes`) to confirm everything works

### **During Development:**

- **Use Postman** to test API changes
- **Use pgAdmin** to inspect database changes
- **Watch server terminal** for error messages and logs
- **Refresh pgAdmin tables** to see database updates

### **Ending Your Session:**

- **Ctrl+C** in terminal to stop server
- **Close Postman** (or leave open for next time)
- **pgAdmin** can stay open (maintains connection)

---

## 🚀 **You're Ready!**

With this setup, you have a complete full-stack development environment:

- **Database Management** (pgAdmin 4)
- **API Development** (Your Express.js server)  
- **API Testing** (Postman)
- **Cloud Database** (AWS RDS PostgreSQL)

**This is exactly how professional developers work!** 🌟

---

**Need help with any step? Let me know and I'll guide you through it!** 💪
