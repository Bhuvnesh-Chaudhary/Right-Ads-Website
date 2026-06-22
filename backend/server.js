const express = require('express');
const connectDB = require('./config/db'); // Database connection
const cors = require('cors'); // Frontend se request allow karne ke liye
const leadRoutes = require('./routes/leadRoutes'); // Routes import kiye

const app = express();

// 1. Connect to Database
connectDB();

// 2. Middleware
app.use(cors()); // Ye cross-origin requests ko handle karega
app.use(express.json()); // Ye client se aane wale JSON data ko read karne ke liye zaruri hai
app.use(express.urlencoded({ extended: true })); // Agar form data submit ho raha hai

// 3. Routes
// Sabhi API requests '/api/leads' se start hongi
app.use('/api/leads', leadRoutes);

// 4. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});