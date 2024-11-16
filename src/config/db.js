// Importing the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Loading environment variables from the .env file.
// Make sure to create a .env file in the root directory of the project and add the MONGO_URI variable.
require('dotenv').config();

//Connect to the MongoDB database
const connectDB = async () => {
  try {
    // Connecting to MongoDB using the URI from the environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected'); // Success message if connection is established
  } catch (err) {
    
    console.error('Database connection error:', err);
    process.exit(1); 
  }
};
// Exporting the connectDB function for use in other files
module.exports = connectDB;
