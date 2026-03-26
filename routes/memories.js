const express = require('express');
const router = express.Router();
const Memory = require('../models/Memory');

// Get all memories
router.get('/memories', async (req, res) => {
  try {
    const memories = await Memory.find().sort({ date: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single memory by ID
router.get('/memory/:id', async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ error: 'Memory not found' });
    }
    res.json(memory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a memory
router.post('/memory', async (req, res) => {
  try {
    const { title, message, image } = req.body;
    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' });
    }
    const memory = new Memory({ title, message, image: image || '📷' });
    await memory.save();
    res.json({ success: true, memory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
