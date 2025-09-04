-- InkConnect Database Schema
-- Draft v1 (Sep 5, 2025)

-- Drop database if it already exists (for clean setup during dev)
DROP DATABASE IF EXISTS inkconnect_db;

-- Create new database
CREATE DATABASE inkconnect_db;
USE inkconnect_db;

-- Table: artists
CREATE TABLE artists (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Table: clients
CREATE TABLE clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20)
);

-- Table: requests
CREATE TABLE requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    artist_id INT NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    FOREIGN KEY (client_id) REFERENCES clients(client_id),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);

-- Table: messages
CREATE TABLE messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ✅ Schema includes:
-- - 4 tables
-- - 2+ fields each
-- - Relationships: requests links clients + artists
-- - Messages for communication
