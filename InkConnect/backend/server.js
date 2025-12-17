// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import usersRoutes from './routes/users.js';
import artistsRoutes from './routes/artists.js';
import artistRequestsRoutes from './routes/artistRequests.js';
import portfolioRoutes from './routes/portfolio.js';
import requestResponsesRoutes from './routes/request_responses.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/artists', artistsRoutes);
app.use('/api/artist-requests', artistRequestsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/request-responses', requestResponsesRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
