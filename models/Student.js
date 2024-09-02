const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  grade: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' }
});

studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

studentSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Student', studentSchema);
