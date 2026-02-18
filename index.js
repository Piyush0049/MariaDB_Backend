require('dotenv').config();
const express = require('express');
const cors = require('cors');
console.log('Environment variables loaded. DB_USER:', process.env.DB_USER);
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
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
