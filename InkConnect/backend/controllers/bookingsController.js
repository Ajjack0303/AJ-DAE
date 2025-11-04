// backend/controllers/bookingsController.js
const { pool } = require('../db');

async function getBookings(req, res) {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
}

async function getBookingById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM bookings WHERE id=$1', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Booking not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
}

async function createBooking(req, res) {
  const { project_id, client_id, booking_date, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO bookings (project_id, client_id, booking_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [project_id, client_id, booking_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
}

async function updateBooking(req, res) {
  const { id } = req.params;
  const { project_id, client_id, booking_date, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE bookings SET project_id=$1, client_id=$2, booking_date=$3, status=$4 WHERE id=$5 RETURNING *',
      [project_id, client_id, booking_date, status, id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Booking not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update booking' });
  }
}

async function deleteBooking(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM bookings WHERE id=$1 RETURNING *', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully', booking: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
}

module.exports = { getBookings, getBookingById, createBooking, updateBooking, deleteBooking };
