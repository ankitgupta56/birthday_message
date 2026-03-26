const express = require('express');
const router = express.Router();
const LoveNote = require('../models/LoveNote');

// Get a random love note
router.get('/lovenote', async (req, res) => {
  try {
    const count = await LoveNote.countDocuments();
    if (count === 0) {
      return res.json({ message: '❤️ No love notes yet. Add one!' });
    }
    const random = Math.floor(Math.random() * count);
    const note = await LoveNote.findOne().skip(random);
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all love notes
router.get('/lovenotes', async (req, res) => {
  try {
    const notes = await LoveNote.find().sort({ date: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a love note (add message feature)
router.post('/lovenote', async (req, res) => {
  try {
    const { message, emoji } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const note = new LoveNote({ message, emoji: emoji || '❤️' });
    await note.save();
    res.json({ success: true, note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
