const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  maxScore: Number
});

module.exports = mongoose.model('User', userSchema);
