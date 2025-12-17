// backend/controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h';

// ====================
// REGISTER
// ====================
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'client',
      },
    });

    let artist = null;

    // If role is 'artist' or 'admin', optionally create Artist record
    if (role === 'artist' || role === 'admin') {
      artist = await prisma.artist.create({
        data: {
          name,
          email,
          userId: newUser.id, // Link to User
        },
      });

      // Update user with artist relation
      await prisma.user.update({
        where: { id: newUser.id },
        data: { artist: { connect: { id: artist.id } } },
      });
    }

    res.status(201).json({
      message: 'Registration successful',
      user: newUser,
      artist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// ====================
// LOGIN
// ====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { artist: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};
