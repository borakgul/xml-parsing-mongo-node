require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();
connectDB();
app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.use('/api/products', verifyToken, productRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
