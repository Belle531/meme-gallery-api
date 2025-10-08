-- Meme Gallery Database Schema
-- This file contains the CREATE TABLE statements for the meme gallery application

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create memes table with foreign key reference to users
CREATE TABLE IF NOT EXISTS memes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_memes_user_id ON memes(user_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Add comments to tables for documentation
COMMENT ON TABLE users IS 'Stores user account information for the meme gallery';
COMMENT ON TABLE memes IS 'Stores meme entries with references to their creators';
COMMENT ON COLUMN memes.url IS 'URL pointing to the meme image file';
COMMENT ON COLUMN memes.user_id IS 'Foreign key reference to the user who created this meme';