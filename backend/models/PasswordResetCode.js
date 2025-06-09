const mongoose = require('mongoose');

const passwordResetCodeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PasswordResetCode', passwordResetCodeSchema);
