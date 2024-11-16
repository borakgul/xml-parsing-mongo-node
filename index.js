require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));