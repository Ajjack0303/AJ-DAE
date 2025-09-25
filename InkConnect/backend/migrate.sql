-- migrate.sql
ALTER TABLE portfolios
  ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);

-- (Optional) Create a sample artist if you need one for testing (skip if already present)
-- INSERT INTO users (username, email, password_hash, role, style, location)
-- VALUES ('artist_test','artist_test@example.com','testpass','artist','Traditional','Remote');

-- show result
SELECT 'OK' as migrate_status;
