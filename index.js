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


app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
