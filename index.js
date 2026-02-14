const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Main Health check
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running with MVC structure!' });
});

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
