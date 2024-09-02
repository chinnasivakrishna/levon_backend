const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  // Check for student first
  let user = await Student.findOne({ email });
  console.log(user)
  if (user) {
    if (await user.comparePassword(password)) {
      console.log("hii")
      const token = jwt.sign({ id: user._id, role: 'student' }, '12345', { expiresIn: '1h' });
      return res.json({ token, role: 'student' });
    } else {
      return res.status(401).send('Invalid credentials');
    }
  }

  // Check for teacher if not found as student
  user = await Teacher.findOne({ email });
  console.log(user)
  if (user) {
    if (await user.comparePassword(password)) {
      const token = jwt.sign({ id: user._id, role: 'teacher' }, '12345', { expiresIn: '1h' });
      return res.json({ token, role: 'teacher' });
    } else {
      return res.status(401).send('Invalid credentials');
    }
  }

  // User not found in both collections
  res.status(401).send('Invalid credentials');
});

module.exports = router;
