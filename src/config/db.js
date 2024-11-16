//Load environment variables from .env file.
// !!! That file will be secret and not committed to the repository.
// !!! It will contain sensitive data like database connection strings. 
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

// Initialize the Express application
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse incoming JSON requests. It comes with Express.
app.use(express.json());

//Define the port the server will listen on (from .env file or default to 4000)
const PORT = process.env.PORT || 4000;

//Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
