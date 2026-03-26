# 🚀 QUICK START GUIDE

## Step 1: Setup MongoDB
Choose ONE option:

### Option A: Local MongoDB (Easiest for testing)
1. Download and install from: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. .env is already configured for local MongoDB ✅

### Option B: MongoDB Atlas (Free cloud database)
1. Create free account at: https://www.mongodb.com/cloud/atlas
2. Create a cluster (select free tier)
3. Get connection string
4. Replace MONGO_URI in `.env` file with your connection string

## Step 2: Start the Server
```bash
npm start
```

You should see:
```
✅ MongoDB Connected!
🎁 Birthday Love Server running on http://localhost:5000
```

## Step 3: Open Your Website
Go to: http://localhost:5000

## Step 4: Add Your Love Notes & Memories

### In Browser Console (F12 → Console):
```javascript
// Add a love note
fetch('/api/lovenote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "You are my everything",
    emoji: "❤️"
  })
}).then(r => r.json()).then(d => console.log('Added:', d));
```

### Or use the EXAMPLE_ADD_DATA.js file for more examples!

## 🎁 What You Can Do Now

✅ Show random love messages
✅ Display memories from the database
✅ Track visits with a counter
✅ Show secret birthday messages
✅ All with beautiful animations!

## 📝 Configuration

Edit `.env` to customize:
- `MONGO_URI` - Your database connection
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## 🆘 Common Issues

### MongoDB Connection Failed
- Make sure MongoDB is running
- Check MONGO_URI in .env
- For Atlas, whitelist your IP

### Port 5000 Already in Use
Edit .env and change PORT to 3000, 8000, etc.

## 📱 Test on All Devices
Use Chrome DevTools → Responsive Design Mode to test mobile view

## 🎯 Next Steps
1. Add your personalized love notes, memories, and messages
2. Customize colors and animations in the HTML
3. Add real photos/URLs to memories
4. Deploy to Heroku or Railway (see README.md)

Enjoy! 💖
