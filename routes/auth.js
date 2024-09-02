const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, '12345', { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

module.exports = router;
