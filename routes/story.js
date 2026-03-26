const express = require('express');
const router = express.Router();
const LoveStory = require('../models/LoveStory');

// Get all love story timeline items
router.get('/love-story', async (req, res) => {
  try {
    const stories = await LoveStory.find().sort({ createdAt: 1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific love story item by ID
router.get('/love-story/:id', async (req, res) => {
  try {
    const story = await LoveStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a love story item
router.post('/love-story', async (req, res) => {
  try {
    const { title, description, date, emoji } = req.body;
    if (!title || !description || !date) {
      return res.status(400).json({ error: 'Title, description, and date are required' });
    }
    const story = new LoveStory({ title, description, date, emoji: emoji || '💕' });
    await story.save();
    res.json({ success: true, story });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
