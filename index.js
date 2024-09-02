const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');

const app = express();

const DB_URL = process.env.MONGO_URL;

mongoose.connect(DB_URL, {})
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Database not connected"));

// Configure CORS to allow requests from any origin
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow methods as needed
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
