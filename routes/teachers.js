const express = require('express');
const Teacher = require('../models/Teacher');
const auth = require('../middleware/auth');

const router = express.Router();

// Add a new teacher
router.post('/', auth('teacher'), async (req, res) => {
  console.log(req.body)
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.status(201).send(teacher);
});

router.post('/register', async (req, res) => {
  const student = new Teacher(req.body);
  await student.save();
  res.status(201).send(student);
});

// Get all teachers
router.get('/', async (req, res) => {
  const teachers = await Teacher.find();
  res.send(teachers);
});

module.exports = router;
