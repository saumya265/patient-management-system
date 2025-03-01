const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect to MongoDB
connectDB();

//Middleware
app.use(express.json());

//Routes
app.use('/auth', require('/routes/authRoutes'));
app.use('/admin', require('routes/adminRoutes'));
app.use('/doctor', require('routes/doctorRoutes'));
app.use('/patient', require('routes/patientRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));
