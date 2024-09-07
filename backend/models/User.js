const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timezone: { type: Object, default: {} },
  schedule: { type: Array, default: [] },
});

module.exports = mongoose.model('User', userSchema);
