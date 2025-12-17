// backend/controllers/messagesController.js
import prisma from '../prismaClient.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await prisma.message.findMany({ include: { sender: true, receiver: true } });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessageById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const message = await prisma.message.findUnique({ where: { id }, include: { sender: true, receiver: true } });
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const created = await prisma.message.create({ data: { senderId, receiverId, content } });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMessage = async (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;
  try {
    const updated = await prisma.message.update({ where: { id }, data: { content } });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.message.delete({ where: { id } });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
