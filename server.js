const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const path = require('path');

const app = express();

// Set your password here - change this to your desired password
const PASSWORD = process.env.WEBSITE_PASSWORD || 'love2024';

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000 } // 1 minute - forces password re-entry frequently
}));

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/birthday-love';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// ===== AUTHENTICATION ROUTES =====
// Login route
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  
  if (password === PASSWORD) {
    req.session.authenticated = true;
    res.json({ success: true, message: 'Password correct! Welcome! 🎉' });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});

// Check authentication status
app.get('/api/check-auth', (req, res) => {
  res.json({ authenticated: req.session.authenticated || false });
});

// Logout route
app.post('/api/logout', (req, res) => {
  req.session.authenticated = false;
  res.json({ success: true, message: 'Logged out' });
});

// Middleware to protect API routes
const requireAuth = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.status(401).json({ authenticated: false, message: 'Please login first' });
  }
};

// Routes
app.use('/api/notes', requireAuth, require('./routes/notes'));
app.use('/api/memories', requireAuth, require('./routes/memories'));
app.use('/api/messages', requireAuth, require('./routes/messages'));
app.use('/api/visits', requireAuth, require('./routes/visits'));
app.use('/api/story', requireAuth, require('./routes/story'));
app.use('/api/quiz', requireAuth, require('./routes/quizzes'));

console.log('✓ All routes loaded successfully');

// Serve index.html or login page based on auth
app.get('/', (req, res) => {
  // Always redirect to login on fresh page load
  req.session.authenticated = false;
  
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Main authenticated page (protected route)
app.get('/main', (req, res) => {
  if (req.session.authenticated) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    res.redirect('/');
  }
});

// Block direct access to index.html - redirect to /
app.get('/index.html', (req, res) => {
  res.redirect('/');
});

// Serve login.html at /login
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve static assets (CSS, JS, images, etc.) - this must come AFTER route handlers
app.use((req, res, next) => {
  // Prevent direct access to protected files through static middleware
  if (req.path === '/index.html') {
    return res.redirect('/');
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Initialize database with sample data (only if empty)
app.get('/api/init-data', async (req, res) => {
  try {
    const LoveNote = require('./models/LoveNote');
    const Memory = require('./models/Memory');
    const SecretMessage = require('./models/SecretMessage');
    const LoveStory = require('./models/LoveStory');
    const loveMessages = require('./data/loveMessages');

    const notesCount = await LoveNote.countDocuments();
    const memoriesCount = await Memory.countDocuments();
    const secretCount = await SecretMessage.countDocuments();
    const storyCount = await LoveStory.countDocuments();

    // Initialize with 100+ love messages
    if (notesCount === 0) {
      await LoveNote.insertMany(loveMessages);
      console.log('✅ 100+ love messages loaded!');
    }

    // Initialize memories
    if (memoriesCount === 0) {
      const sampleMemories = [
        {
          title: 'Our First Date ❤️',
          message: 'The day I realized how special you are. Every moment was perfect.',
          image: '📷'
        },
        {
          title: 'First "I Love You" 💖',
          message: 'Those three magical words changed everything. My heart was forever yours.',
          image: '💕'
        },
        {
          title: 'That Rainy Day ☔',
          message: 'We got caught in the rain, but I didn\'t mind at all. Being with you was shelter enough.',
          image: '🌧️'
        }
      ];
      await Memory.insertMany(sampleMemories);
    }

    // Initialize secret messages
    if (secretCount === 0) {
      const sampleSecrets = [
        { message: 'You are my favorite hello and my hardest goodbye', emoji: '🎁' },
        { message: 'In case you forgot - you are the best thing that ever happened to me', emoji: '💝' },
        { message: 'Forever young, forever together, forever us', emoji: '✨' },
        { message: 'Happy Birthday to the love of my life! You mean everything to me 🎂', emoji: '🎂' },
        { message: 'Thank you for loving me, believing in me, and making my dreams come true ❤️', emoji: '❤️' }
      ];
      await SecretMessage.insertMany(sampleSecrets);
    }

    // Initialize love story timeline
    if (storyCount === 0) {
      const sampleStory = [
        {
          title: 'The Day We Met ❤️',
          description: 'The day my life became more beautiful. Our eyes met and my heart knew this was special.',
          date: '2023',
          emoji: '👀'
        },
        {
          title: 'First Kiss 💋',
          description: 'A moment I will never forget. Your lips on mine made everything feel right.',
          date: '2023',
          emoji: '💋'
        },
        {
          title: 'Saying "I Love You" 💖',
          description: 'Three magical words that changed everything. I was the happiest person on earth.',
          date: '2023',
          emoji: '💖'
        },
        {
          title: 'Moving In Together 🏠',
          description: 'Starting our life together under one roof. Every day with you is an adventure.',
          date: '2024',
          emoji: '🏠'
        },
        {
          title: 'Our Dreams Together 🌟',
          description: 'Building a future filled with love, laughter, and endless possibilities.',
          date: '2024',
          emoji: '🌟'
        }
      ];
      await LoveStory.insertMany(sampleStory);
    }

    res.json({ success: true, message: 'Database initialized with love data!', counts: { notes: loveMessages.length, stories: storyCount } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎁 Birthday Love Server running on http://localhost:${PORT}`);
});
