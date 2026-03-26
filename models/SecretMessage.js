const mongoose = require('mongoose');

const secretMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  emoji: {
    type: String,
    default: '🎁'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SecretMessage', secretMessageSchema);
