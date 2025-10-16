const pool = require('../db');

const getAllArtists = async (req, res) => {
  try {
    const artists = await pool.query('SELECT * FROM artists');
    res.json(artists.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await pool.query('SELECT * FROM artists WHERE artist_id = $1', [id]);
    if (!artist.rows.length) return res.status(404).json({ msg: 'Artist not found' });
    res.json(artist.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const addArtist = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const newArtist = await pool.query(
      'INSERT INTO artists (name, bio) VALUES ($1, $2) RETURNING *',
      [name, bio]
    );
    res.json(newArtist.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getAllArtists, getArtistById, addArtist };
