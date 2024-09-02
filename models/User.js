const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  console.log(req.body);

  if (!role || (role !== 'student' && role !== 'teacher')) {
    return res.status(400).send('Invalid role');
  }

  let user;
  if (role === 'student') {
    user = await Student.findOne({ email });
  } else if (role === 'teacher') {
    user = await Teacher.findOne({ email });
  }

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, '12345', { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

module.exports = router;
