# Meme Gallery API Troubleshooting & Learning Notes

Study Guide: Meme Gallery API Assignment

## Assignment Steps Overview

1. **Set up PostgreSQL database (AWS RDS)**

Configure `.env` with database credentials.

2.Initialize Prisma ORM**

Define models in `prisma/schema.prisma`.
Run migrations to create tables.

3.Install dependencies**
`npm install bcrypt jsonwebtoken`
4. **Create authentication routes**

`/auth/register`: Register new users (hash passwords).
`/auth/login`: Login and return JWT token.
5. **Implement authentication middleware**

Protect routes using JWT (`authenticateToken`).

6.Protect meme creation route**

  Only authenticated users can POST `/memes`.

7.Test endpoints in Postman**

  Register, login, and create memes using token.

8.Troubleshoot errors and verify database**

  Use SQL queries and Prisma commands to check data.

## Port Error Troubleshooting

### Common Port Issues

- **EADDRINUSE: address already in use :::3000**
  - Port 3000 is already used by another process.

### How to Fix

1. Run `netstat -ano | findstr :3000` to find the PID using port 3000.
2. Run `taskkill /PID <PID> /F` to kill the process.
3. Use `tasklist /FI "PID eq <PID>"` to identify the process name.
4. Check Task Manager (Details tab) for lingering processes.
5. Restart your server with `npm start`.

### Why Does This Happen?

- Previous server processes did not shut down cleanly.
- Another app or IDE is running a server on the same port.
- Multiple terminals or background services using port 3000.

## Key Learning Points

- Always use plain-text password for registration and login.
- Use double quotes for table names in SQL: `"User"`.
- Prisma migrations must match your schema and database state.
- JWT tokens must be sent as `Authorization: Bearer <token>`.
- Use Postman for step-by-step API testing.
- Check server logs and database contents for debugging.

## Common Errors & Fixes

### 1. Port 3000 Already in Use (EADDRINUSE)

- **Error:** `Error: listen EADDRINUSE: address already in use :::3000`
- **Fix:**
  1. Run `netstat -ano | findstr :3000` to find the PID using port 3000.
  2. Run `taskkill /PID <PID> /F` to kill the process.
  3. Restart your server with `npm start`.

### 2. Prisma Client Not Initialized

- **Error:** `Error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.`
- **Fix:**
  1. Run `npx prisma generate`.
  2. Restart your server.

### 3. Database Schema Drift / Migration Issues

- **Error:** `Drift detected: Your database schema is not in sync with your migration history.`
- **Fix:**
  1. For development, run `npx prisma migrate reset` (will delete all data).
  2. For production, use `npx prisma migrate resolve --applied <migration_name>` to baseline.

### 4. Table Does Not Exist

- **Error:** `relation user does not exist`
- **Fix:**
  1. Run `npx prisma migrate dev --name init` to create tables.
  2. Check with `SELECT * FROM "User";` in pgAdmin or psql.

### 5. Registration: User Already Exists

- **Error:** `400 Bad Request: user already exists`
- **Fix:**
  - Use a unique username for each registration.
  - Check existing users with `SELECT * FROM "User";`.

### 6. Login: Invalid Credentials / User Does Not Exist

- **Error:** `401 Unauthorized: Invalid credentials` or `User does not exist`
- **Fix:**
  - Use the exact plain-text password you registered with.
  - Confirm the user exists in the database.

### 7. Protected Route: 403 Forbidden

- **Error:** `403 Forbidden`
- **Fix:**
  1. In Postman, set header:
     - Key: `Authorization`
     - Value: `Bearer <your-token-here>`
  2. Use a fresh token from login.
  3. Confirm your route uses the `authenticateToken` middleware.

## Useful Commands

- `netstat -ano | findstr :3000` — Find processes using port 3000.
- `taskkill /PID <PID> /F` — Kill a process by PID.
- `npx prisma generate` — Generate Prisma client.
- `npx prisma migrate dev --name init` — Create and apply initial migration.
- `npx prisma migrate reset` — Reset database and reapply migrations.
- `SELECT * FROM "User";` — List all users in the database.

## Step-by-Step Testing Guide (with Server Start & Port Check)

### 0. Start Your Server & Check Port

1. **Check if port 3000 is free:**
   - Run `netstat -ano | findstr :3000` in your terminal.
   - If you see a PID, run `taskkill /PID <PID> /F` to kill the process.
   - Optionally, use `tasklist /FI "PID eq <PID>"` to see the process name.
2. **Start your server:**
   - In your project directory, run:

     npm start

   - Confirm you see a message like `Server is running at http://localhost:3000`.

### 1. Register a New User

  POST `/auth/register`
  Body (raw, JSON):
     ```json
     { "username": "testuser1", "password": "mySecretPassword" }
     ```
    Click "Send" and screenshot the response.

### 2. Login

   POST `/auth/login`
   Body (raw, JSON):

     ```json
     { "username": "testuser1", "password": "mySecretPassword" }
     ```
   -Click "Send" and screenshot the token response.

### 3. Create Meme (Protected)

  POST `/memes`
  Header:
     - Key: `Authorization`
     - Value: `Bearer <your-token-here>`
     -Body (raw, JSON):

     ```json
     { "title": "My Meme", "url": "https://example.com/meme.jpg" }
     ```
   Click "Send" and screenshot the created meme response.

  Correct code formate
title=Funny Meme
url=[https://example.com/meme.jpg]

   Summary:

Always match your request body to the expected fields in the controller and schema.
Update your API documentation and Postman requests if you change the schema.
Use server logs to pinpoint the exact error.
If you want to add more fields, update both the Prisma schema and the controller logic, then run migrations.

## Notes

- Always use plain-text password for registration and login.
- Use double quotes for table names in SQL: `"User"`.
- If you get repeated port issues, check Task Manager for lingering processes.
- Prisma migrations must match your schema and database state.

Keep this file as a reference for future troubleshooting and learning!
