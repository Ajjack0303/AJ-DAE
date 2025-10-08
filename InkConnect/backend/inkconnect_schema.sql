-- inkconnect_schema.sql
-- Drop existing tables and recreate
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- ===============================
-- Users table
-- ===============================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample users
INSERT INTO users (username, email, password) VALUES
('Alice', 'alice@example.com', '$2a$10$7e2xGzJ4r0fQfH2R4s4GfOk6H9A8UIqFvAqjvVx4K8eK1H3/1bP5a'),
('Bob', 'bob@example.com', '$2a$10$7e2xGzJ4r0fQfH2R4s4GfOk6H9A8UIqFvAqjvVx4K8eK1H3/1bP5a');

-- ===============================
-- Portfolio table
-- ===============================
CREATE TABLE portfolio (
    portfolio_id SERIAL PRIMARY KEY,
    artist_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample portfolio entries
INSERT INTO portfolio (artist_id, title, description, image_url) VALUES
(1, 'Dragon Tattoo', 'Black and grey dragon', 'https://res.cloudinary.com/demo/image/upload/dragon.jpg'),
(2, 'Phoenix Tattoo', 'Fiery color design', 'https://res.cloudinary.com/demo/image/upload/phoenix.jpg');

-- ===============================
-- Artist Requests table
-- ===============================
CREATE TABLE artist_requests (
    request_id SERIAL PRIMARY KEY,
    client_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    artist_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample requests
INSERT INTO artist_requests (client_id, artist_id, message, status) VALUES
(2, 1, 'I want a full back dragon tattoo', 'pending'),
(1, 2, 'Looking for a colorful phoenix tattoo', 'pending');

-- ===============================
-- Request Responses table
-- ===============================
CREATE TABLE request_responses (
    response_id SERIAL PRIMARY KEY,
    request_id INT NOT NULL REFERENCES artist_requests(request_id) ON DELETE CASCADE,
    artist_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample responses
INSERT INTO request_responses (request_id, artist_id, message) VALUES
(1, 1, 'Sounds great! I can start next week.'),
(2, 2, 'I am available this weekend for the session.');
