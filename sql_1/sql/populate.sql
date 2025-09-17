-- -----------------------------
-- Users
-- -----------------------------
INSERT INTO users (username, email, password_hash, role)
VALUES
('alice', 'alice@example.com', 'hashed_pw_1', 'client'),
('bob', 'bob@example.com', 'hashed_pw_2', 'artist'),
('carol', 'carol@example.com', 'hashed_pw_3', 'client');

-- -----------------------------
-- Portfolios
-- -----------------------------
INSERT INTO portfolios (artist_id, title, description)
VALUES
(2, 'Dragon Sleeve', 'A full sleeve dragon tattoo'),
(2, 'Phoenix Back', 'A phoenix rising from flames'),
(2, 'Minimalist Skull', 'Small minimalist skull designs');

-- -----------------------------
-- Artist Requests
-- -----------------------------
INSERT INTO artist_requests (client_id, artist_id, title, description, status)
VALUES
(1, 2, 'Dragon Tattoo', 'Looking for a dragon tattoo on my arm', 'pending'),
(3, 2, 'Phoenix Tattoo', 'Phoenix design for upper back', 'pending'),
(1, 2, 'Skull Tattoo', 'Small skull on wrist', 'pending');

-- -----------------------------
-- Request Responses
-- -----------------------------
INSERT INTO request_responses (request_id, artist_id, message)
VALUES
(1, 2, 'I can do this design next week'),
(2, 2, 'I will start sketching tomorrow'),
(3, 2, 'Sounds good, see you on Friday');
