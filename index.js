const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const bodyParser = require("body-parser")
const app = express();

const DB_URL = process.env.MONGO_URL;

mongoose.connect(DB_URL, {
})
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Database not connected"));


app.use(cors({
  origin: ["https://super-concha-e3a5cf.netlify.app"],
  methods: ["GET", "POST"],
  credentials:true
}));
app.use(bodyParser.json());

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
