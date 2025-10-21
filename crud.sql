-- Meme Gallery CRUD Operations
-- This file contains sample CREATE, READ, UPDATE, DELETE operations for the database

-- ========================================
-- CREATE OPERATIONS (INSERT)
-- ========================================

-- Insert sample users
INSERT INTO users (username, password) VALUES 
    ('alice_memes', 'hashed_password_123'),
    ('bob_creator', 'hashed_password_456'),
    ('charlie_funny', 'hashed_password_789');

-- Insert sample memes
INSERT INTO memes (title, url, user_id) VALUES 
    ('Grumpy Cat Classic', 'https://example.com/grumpy-cat.jpg', 1),
    ('Success Kid Motivation', 'https://example.com/success-kid.jpg', 1),
    ('Distracted Boyfriend', 'https://example.com/distracted-boyfriend.jpg', 2),
    ('Woman Yelling at Cat', 'https://example.com/woman-cat.jpg', 2),
    ('Drake Pointing', 'https://example.com/drake-pointing.jpg', 3),
    ('This is Fine Dog', 'https://example.com/this-is-fine.jpg', 3);

-- ========================================
-- READ OPERATIONS (SELECT)
-- ========================================

-- Get all memes
SELECT * FROM memes ORDER BY created_at DESC;

-- Get all memes with user information
SELECT 
    m.id,
    m.title,
    m.url,
    m.created_at,
    u.username AS creator
FROM memes m
JOIN users u ON m.user_id = u.id
ORDER BY m.created_at DESC;

-- Get a specific meme by ID
SELECT * FROM memes WHERE id = 1;

-- Get all memes by a specific user
SELECT * FROM memes WHERE user_id = 1;

-- Get memes created in the last day
SELECT * FROM memes 
WHERE created_at >= DATEADD(day, -1, GETDATE())
ORDER BY created_at DESC;

-- Count total memes per user
SELECT 
    u.username,
    COUNT(m.id) AS meme_count
FROM users u
LEFT JOIN memes m ON u.id = m.user_id
GROUP BY u.id, u.username
ORDER BY meme_count DESC;

-- Search memes by title
SELECT * FROM memes 
WHERE title LIKE '%cat%'
ORDER BY created_at DESC;

-- ========================================
-- UPDATE OPERATIONS
-- ========================================

-- Update a meme's title
UPDATE memes 
SET title = 'Updated Grumpy Cat Meme'
WHERE id = 1;

-- Update a meme's URL
UPDATE memes 
SET url = 'https://newdomain.com/updated-grumpy-cat.jpg'
WHERE id = 1;

-- Update both title and URL
UPDATE memes 
SET title = 'Super Funny Cat Meme',
    url = 'https://example.com/super-funny-cat.jpg'
WHERE id = 1;

-- Update a user's username
UPDATE users 
SET username = 'alice_memequeen'
WHERE id = 1;

-- ========================================
-- DELETE OPERATIONS
-- ========================================

-- Delete a specific meme
DELETE FROM memes WHERE id = 6;

-- Delete all memes by a specific user (cascading delete will handle this automatically if user is deleted)
DELETE FROM memes WHERE user_id = 3;

-- Delete a user (this will cascade and delete all their memes due to foreign key constraint)
DELETE FROM users WHERE id = 3;


