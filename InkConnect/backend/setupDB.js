// backend/setupDB.js
const { pool } = require('./db');

async function setupDatabase() {
  try {
    // Create Artists table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS artists (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        style VARCHAR(100) NOT NULL
      );
    `);
    console.log('✅ Artists table created or already exists.');

    // Create Portfolio table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        artist_id INTEGER REFERENCES artists(id)
      );
    `);
    console.log('✅ Portfolio table created or already exists.');

    // Insert sample data into Artists
    await pool.query(`
      INSERT INTO artists (name, style)
      VALUES
        ('AJ', 'Tattoo'),
        ('Taylor', 'Digital Art'),
        ('Jordan', 'Illustration')
      ON CONFLICT DO NOTHING;
    `);
    console.log('✅ Sample artists inserted.');

    // Insert sample data into Portfolio
    await pool.query(`
      INSERT INTO portfolio (title, description, artist_id)
      VALUES
        ('Dragon Tattoo', 'Full sleeve dragon tattoo design', 1),
        ('Abstract Portrait', 'Digital portrait with abstract elements', 2),
        ('Graffiti Mural', 'Street art mural project', 3)
      ON CONFLICT DO NOTHING;
    `);
    console.log('✅ Sample portfolio projects inserted.');

  } catch (err) {
    console.error('❌ Error setting up database:', err);
  } finally {
    pool.end();
  }
}

setupDatabase();
