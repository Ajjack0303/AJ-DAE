// backend/controllers/clientsController.js
import prisma from '../prismaClient.js';

const prisma = new PrismaClient();

// Get all clients
export const getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany();
    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};

// Get single client by ID
export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await prisma.client.findUnique({ where: { id: parseInt(id) } });
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch client' });
  }
};

// Create a new client
export const createClient = async (req, res) => {
  const { name, email } = req.body;
  try {
    const client = await prisma.client.create({ data: { name, email } });
    res.status(201).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create client' });
  }
};

// Update client
export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const client = await prisma.client.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });
    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update client' });
  }
};

// Delete client
export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.client.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete client' });
  }
};
