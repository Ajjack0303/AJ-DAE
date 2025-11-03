// controllers/bookingsController.js
let dummyBookings = [
  { id: 1, userId: 1, artistId: 1, date: '2025-11-10' },
  { id: 2, userId: 2, artistId: 2, date: '2025-11-12' }
];

module.exports = {
  getBookings: (req, res) => res.json(dummyBookings),

  createBooking: (req, res) => {
    const { userId, artistId, date } = req.body;
    if (!userId || !artistId || !date) return res.status(400).json({ error: 'userId, artistId, and date required' });

    const newBooking = { id: dummyBookings.length + 1, userId, artistId, date };
    dummyBookings.push(newBooking);
    res.json(newBooking);
  },

  updateBooking: (req, res) => {
    const { id } = req.params;
    const booking = dummyBookings.find(b => b.id === parseInt(id));
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    const { userId, artistId, date } = req.body;
    if (userId) booking.userId = userId;
    if (artistId) booking.artistId = artistId;
    if (date) booking.date = date;

    res.json(booking);
  },

  deleteBooking: (req, res) => {
    const { id } = req.params;
    const index = dummyBookings.findIndex(b => b.id === parseInt(id));
    if (index === -1) return res.status(404).json({ error: 'Booking not found' });

    const deleted = dummyBookings.splice(index, 1);
    res.json({ message: `Booking ${id} deleted`, deleted });
  }
};
