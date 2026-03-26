const express = require('express');
const router = express.Router();
const VisitCounter = require('../models/VisitCounter');
const SecretMessage = require('../models/SecretMessage');

// Get visit count and increment
router.get('/visits', async (req, res) => {
  try {
    let counter = await VisitCounter.findOne();
    if (!counter) {
      counter = new VisitCounter({ count: 1 });
    } else {
      counter.count += 1;
    }
    counter.lastVisit = new Date();
    await counter.save();
    res.json({ count: counter.count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get random secret message
router.get('/secret', async (req, res) => {
  try {
    const count = await SecretMessage.countDocuments();
    if (count === 0) {
      return res.json({ message: '🎁 No secret messages yet. Add one!' });
    }
    const random = Math.floor(Math.random() * count);
    const secret = await SecretMessage.findOne().skip(random);
    res.json(secret);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add secret message
router.post('/secret', async (req, res) => {
  try {
    const { message, emoji } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const secret = new SecretMessage({ message, emoji: emoji || '🎁' });
    await secret.save();
    res.json({ success: true, secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
