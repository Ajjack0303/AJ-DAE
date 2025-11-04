// backend/controllers/projectsController.js
const { pool } = require('../db');

async function getProjects(req, res) {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

async function getProjectById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id=$1', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Project not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
}

async function createProject(req, res) {
  const { name, client_id, artist_id, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO projects (name, client_id, artist_id, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, client_id, artist_id, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project' });
  }
}

async function updateProject(req, res) {
  const { id } = req.params;
  const { name, client_id, artist_id, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE projects SET name=$1, client_id=$2, artist_id=$3, status=$4 WHERE id=$5 RETURNING *',
      [name, client_id, artist_id, status, id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Project not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update project' });
  }
}

async function deleteProject(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM projects WHERE id=$1 RETURNING *', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully', project: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
}

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
