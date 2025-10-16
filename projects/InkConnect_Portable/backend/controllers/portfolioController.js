const pool = require('../db');

const getPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    const portfolio = await pool.query('SELECT * FROM portfolio WHERE user_id = $1', [userId]);
    res.json(portfolio.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const addPortfolioItem = async (req, res) => {
  try {
    const { userId, title, description, imageUrl } = req.body;
    const newItem = await pool.query(
      'INSERT INTO portfolio (user_id, title, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, title, description, imageUrl]
    );
    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getPortfolio, addPortfolioItem };
