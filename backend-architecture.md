# Meme Gallery API Architecture Plan

This document outlines the backend architecture for the Meme Gallery API. It describes the planned RESTful routes, models, relationships, authentication, role-based access control, and other considerations for building a secure, scalable, and maintainable API. The design follows best practices for modern web APIs and is intended to support future features and growth.

## Planned API Routes

 Authentication

- POST /auth/register — Register a new user
- POST /auth/login — Log in and receive a JWT

User

- GET /users/:id — Get user profile
- GET /users/:id/memes — Get memes by user

Meme

- POST /memes — Create meme (auth required)
- GET /memes — List all memes
- GET /memes/:id — Get meme by ID
- PUT /memes/:id — Update meme (auth required, owner or admin)
- DELETE /memes/:id — Delete meme (auth required, owner or admin)

Like

- POST /memes/:id/like — Like a meme (auth required)
- DELETE /memes/:id/like — Unlike a meme (auth required)

## Planned Models

User

- id: Int (primary key)
- username: String (unique)
- password: String (hashed)
- role: String (e.g., 'user', 'admin')
- createdAt: DateTime
- memes: Meme[] (relation)
- likes: Like[] (relation)

Meme

- id: Int (primary key)
- title: String
- url: String
- userId: Int (foreign key to User)
- createdAt: DateTime
- user: User (relation)
- likes: Like[] (relation)

Like

- id: Int (primary key)
- userId: Int (foreign key to User)
- memeId: Int (foreign key to Meme)
- createdAt: DateTime
- user: User (relation)
- meme: Meme (relation)

## Model Definitions (Concise)

- **User**: id, username, password (hashed), role (admin/regular)
- **Meme**: id, title, url, userId
- **UserLikesMeme**: id, userId, memeId

## Planned Relationships

- User has many Memes (one-to-many)

- Meme belongs to one User (many-to-one)

- User can like many Memes (many-to-many via Like)

- Meme can be liked by many Users (many-to-many via Like)

- Like links User and Meme (each Like references one User and one Meme)

## User Roles

- **Regular users:**
  - Can create, update, and delete their own memes
  - Can like and unlike memes

- **Admin users:**
  - Can delete any meme
  - Can delete any user

## Authentication & Role-Based Access Control

- Use JWT for authentication. Users receive a token upon login, which must be sent in the Authorization header for protected routes.

- Store hashed passwords in the database using bcrypt.

- Add a `role` field to the User model (e.g., 'user', 'admin').

- Middleware checks JWT validity and extracts user info for each request.
- Restrict access to certain endpoints based on user role:

  - Only authenticated users can create, like, or update memes.

  - Only meme owners or admins can update or delete memes.

  - Only admins can manage users or view all user data.

- Return appropriate error responses for unauthorized or forbidden actions.

## Authentication Flow

- New users register with a username and password.

- Passwords are hashed with bcrypt before saving to the database for security.

- On login, the server returns a JWT containing the user’s ID and role.

- Protected routes require the client to send `Authorization: Bearer <token>` in the header.

- Middleware verifies the JWT, extracts user info, and enforces access control based on authentication and role.

## Relationships Diagram

```plaintext
User ───< creates >─── Meme
User ───< likes >─── Likes ───< liked >─── Meme
```

## Other Considerations

- Input validation for all endpoints to prevent invalid or malicious data.

- Centralized error handling to provide consistent and informative error responses.

- Use HTTPS in production to secure data in transit.

- Store secrets (JWT secret, database credentials) in environment variables, never in code or version control.

- Implement pagination for meme lists to improve performance and usability.

- Log important actions and errors for monitoring and debugging.

- Design for scalability: optimize database queries, use indexes, and consider caching for popular endpoints.

- Plan for future features like notifications, comments, or image uploads.
