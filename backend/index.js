require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const mongodbURI = process.env.MONGODB_URI;
console.log(mongodbURI);
console.log(PORT);
console.log("Starting server...");

mongoose.connect(mongodbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to access the MongoDB connection
const db = mongoose.connection;

app.get('/items', async (req, res) => {
  try {
    // Use the native MongoDB driver to list databases
    const admin = db.getClient().db().admin(); // Access the native client
    const databases = await admin.listDatabases();

    res.json({
      message: 'Databases retrieved successfully',
      databases: databases.databases.map(db => db.name),
    });
  } catch (error) {
    console.error('Error retrieving databases:', error);
    res.status(500).json({ error: 'Failed to retrieve databases' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});