const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('Attempting to connect to MongoDB Atlas...');
console.log('Connection string (masked):', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//\$1:****@'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 