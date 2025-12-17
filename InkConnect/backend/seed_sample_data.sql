-- =====================================
-- InkConnect Sample Data Seed Script
-- =====================================

-- 1. Clear existing data to avoid conflicts
TRUNCATE request_responses, portfolios, artist_requests, artists, users RESTART IDENTITY CASCADE;

-- 2. Insert Users
INSERT INTO users (username, email, password_hash, role)
VALUES
('ayla_nomura', 'ayla@example.com', 'password123', 'artist'),
('altolane_jackson', 'altolane@example.com', 'password123', 'artist'),
('john_doe', 'john@example.com', 'password123', 'client'),
('jane_smith', 'jane@example.com', 'password123', 'client');

-- 3. Insert Artists (link to users)
INSERT INTO artists (artist_id, style, location)
VALUES
((SELECT user_id FROM users WHERE username='ayla_nomura'), 'Traditional', 'Tokyo, Japan'),
((SELECT user_id FROM users WHERE username='altolane_jackson'), 'Neo-Traditional', 'Norwalk, CT');

-- 4. Insert Artist Requests
INSERT INTO artist_requests (artist_id, client_id, title, description)
VALUES
(
  (SELECT user_id FROM users WHERE username='ayla_nomura'),
  (SELECT user_id FROM users WHERE username='john_doe'),
  'Dragon Back Piece',
  'Full back dragon tattoo in traditional style'
),
(
  (SELECT user_id FROM users WHERE username='altolane_jackson'),
  (SELECT user_id FROM users WHERE username='jane_smith'),
  'Mandala Sleeve',
  'Neo-traditional mandala sleeve design'
);

-- 5. Insert Portfolios
INSERT INTO portfolios (artist_id, title, description)
VALUES
(
  (SELECT user_id FROM users WHERE username='ayla_nomura'),
  'Dragon Collection',
  'Collection of traditional dragon tattoos'
),
(
  (SELECT user_id FROM users WHERE username='altolane_jackson'),
  'Mandala Works',
  'Neo-traditional mandala designs'
);

-- 6. Insert Request Responses
INSERT INTO request_responses (request_id, artist_id, message)
VALUES
(
  (SELECT request_id FROM artist_requests WHERE artist_id=(SELECT user_id FROM users WHERE username='ayla_nomura') AND client_id=(SELECT user_id FROM users WHERE username='john_doe')),
  (SELECT user_id FROM users WHERE username='ayla_nomura'),
  'Can start next week'
),
(
  (SELECT request_id FROM artist_requests WHERE artist_id=(SELECT user_id FROM users WHERE username='altolane_jackson') AND client_id=(SELECT user_id FROM users WHERE username='jane_smith')),
  (SELECT user_id FROM users WHERE username='altolane_jackson'),
  'Available on requested date'
);

-- 7. Verify Insertions
SELECT * FROM users;
SELECT * FROM artists;
SELECT * FROM artist_requests;
SELECT * FROM portfolios;
SELECT * FROM request_responses;
