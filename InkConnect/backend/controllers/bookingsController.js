// backend/controllers/bookingsController.js
import prisma from '../prismaClient.js';

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { artist: true, payments: true },
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
      include: { artist: true, payments: true },
    });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
};

// Create booking
export const createBooking = async (req, res) => {
  const { artistId, clientName, date, status } = req.body;
  if (!artistId || !clientName || !date || !status)
    return res.status(400).json({ error: 'Missing required fields' });

  try {
    const booking = await prisma.booking.create({
      data: { artistId, clientName, date: new Date(date), status },
    });
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Update booking
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { artistId, clientName, date, status } = req.body;

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        ...(artistId && { artistId }),
        ...(clientName && { clientName }),
        ...(date && { date: new Date(date) }),
        ...(status && { status }),
      },
    });
    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

// Delete booking (admin only)
export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.booking.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};
