const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a message
router.post('/message', async (req, res) => {
  try {
    const { message, emoji } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const newMessage = new Message({ message, emoji: emoji || '💌' });
    await newMessage.save();
    res.json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
