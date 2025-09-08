-- InkConnect Database Schema
-- PostgreSQL Version
-- 4 tables with descriptive names

-- Note: PostgreSQL creates databases outside of SQL scripts typically.
-- Connect to your database before running this script:
-- CREATE DATABASE inkconnect_db;
-- \c inkconnect_db;

-- Table: users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'client', -- client, artist, admin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: portfolios
CREATE TABLE portfolios (
    portfolio_id SERIAL PRIMARY KEY,
    artist_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: artist_requests
CREATE TABLE artist_requests (
    request_id SERIAL PRIMARY KEY,
    client_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    artist_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: request_responses
CREATE TABLE request_responses (
    response_id SERIAL PRIMARY KEY,
    request_id INT NOT NULL REFERENCES artist_requests(request_id) ON DELETE CASCADE,
    artist_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ✅ Schema includes:
-- - 4 tables: users, portfolios, artist_requests, request_responses
-- - Descriptive column names
-- - Foreign key relationships
-- - Cascading deletes for integrity
-- - Timestamp fields for creation tracking
