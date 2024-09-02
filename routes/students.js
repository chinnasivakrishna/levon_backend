const express = require('express');
const Student = require('../models/Student');
const auth = require('../middleware/auth');

const router = express.Router();

// Add a new student
router.post('/', auth('teacher'), async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).send(student);
});
router.post('/register', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).send(student);
});

// Get all students
router.get('/',  async (req, res) => {
  const students = await Student.find();
  console.log(students)
  res.send(students);
});

module.exports = router;
