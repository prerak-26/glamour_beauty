// Entry point for the Node.js backend
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Load all routes
const servicesRoute = require('./routes/services');
app.use('/api/services', servicesRoute);

// Add more routes here as needed

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
