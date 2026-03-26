const mongoose = require('mongoose');

const loveNoteSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  emoji: {
    type: String,
    default: '❤️'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LoveNote', loveNoteSchema);
