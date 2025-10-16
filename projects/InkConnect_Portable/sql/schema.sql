-- 🎨 InkConnect Database Schema
-- PostgreSQL Version
-- We built 4 connected tables: users, portfolios, artist_requests, request_responses

-- Note: PostgreSQL creates databases outside of SQL scripts.
-- So first, connect to your database:
-- CREATE DATABASE inkconnect_db;
-- \c inkconnect_db;

-------------------------------------------------------
-- 1) USERS TABLE
-- This is the "people" table (artists, clients, admins).
-- Every person has a unique ID, username, email, password, and role.
-------------------------------------------------------
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, -- unique ID for each user
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- where passwords get stored (safely hashed)
    role VARCHAR(20) NOT NULL DEFAULT 'client', -- can be client, artist, or admin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- when they joined
);

-------------------------------------------------------
-- 2) PORTFOLIOS TABLE
-- Portfolios belong to artists.
-- Each portfolio links back to a user (artist) using artist_id.
-------------------------------------------------------
CREATE TABLE portfolios (
    portfolio_id SERIAL PRIMARY KEY, -- unique ID for each portfolio
    artist_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- links portfolio to its artist
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------------------------------------------------------
-- 3) ARTIST REQUESTS TABLE
-- Clients send requests to artists.
-- This table connects a client to an artist with a request.
-------------------------------------------------------
CREATE TABLE artist_requests (
    request_id SERIAL PRIMARY KEY, -- unique ID for each request
    client_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- who is asking
    artist_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- who they are asking
    title VARCHAR(100) NOT NULL, -- short title of request
    description TEXT, -- details about the request
    status VARCHAR(20) DEFAULT 'pending', -- request status: pending, accepted, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------------------------------------------------------
-- 4) REQUEST RESPONSES TABLE
-- Artists can respond to requests.
-- This links a response back to both the request and the artist.
-------------------------------------------------------
CREATE TABLE request_responses (
    response_id SERIAL PRIMARY KEY, -- unique ID for each response
    request_id INT NOT NULL REFERENCES artist_requests(request_id) ON DELETE CASCADE, -- which request this response belongs to
    artist_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- which artist replied
    message TEXT NOT NULL, -- the response itself
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ✅ SCHEMA CHECKLIST:
-- - 4 tables: users, portfolios, artist_requests, request_responses
-- - Clear foreign keys showing relationships:
--     * users ←→ portfolios
--     * users (clients/artists) ←→ artist_requests
--     * artist_requests ←→ request_responses
-- - Cascading deletes keep data clean
-- - Normalized design (3NF): no redundant/repeating data
-- - Includes timestamps for tracking creation
