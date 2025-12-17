// backend/controllers/paymentsController.js

import prisma from '../prismaClient.js';
import { getUserFromToken } from '../utils/auth.js'; // if you use this for auth

// Get all payments (admin only)
export const getPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        artist: true,
        booking: true,
      },
    });
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};

// Get payment by ID
export const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(id) },
      include: { artist: true, booking: true },
    });

    if (!payment) return res.status(404).json({ error: 'Payment not found' });

    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
};

// Create new payment
export const createPayment = async (req, res) => {
  const { bookingId, artistId, amount, status } = req.body;

  if (!bookingId || !artistId || !amount || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        artistId,
        amount: parseFloat(amount),
        status,
      },
    });
    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

// Update payment
export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, status } = req.body;

  try {
    const updatedPayment = await prisma.payment.update({
      where: { id: parseInt(id) },
      data: { 
        ...(amount !== undefined && { amount: parseFloat(amount) }),
        ...(status && { status }),
      },
    });
    res.json(updatedPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update payment' });
  }
};

// Delete payment (admin only)
export const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.payment.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete payment' });
  }
};
