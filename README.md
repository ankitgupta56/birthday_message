# 🎁 Romantic Birthday Website with Node.js & MongoDB Backend

A beautiful, interactive birthday surprise website for your girlfriend with a full-stack backend using Node.js, Express, and MongoDB.

## 🌹 Features

✨ **Dynamic Content from Database:**
- **Love Notes**: Random romantic messages from MongoDB
- **Memories**: Store and display precious moments together
- **Birthday Messages**: Add custom love messages
- **Secret Messages**: Hidden special messages with animations
- **Visit Counter**: Track how many times she visits with ❤️

🎨 **Beautiful Animations:**
- Falling flowers 🌸
- Floating hearts ❤️
- Sparkling effects ✨
- Romantic letter transitions
- Confetti explosions 🎉

📱 **Fully Responsive Design:**
- Works perfectly on mobile, tablet, and desktop
- Smooth animations and transitions
- Touch-friendly buttons and interactions

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Local or MongoDB Atlas cloud database)

### Installation

1. **Clone/Navigate to the project:**
```bash
cd birthday.html
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up MongoDB:**

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Keep default connection in `.env`: `MONGO_URI=mongodb://localhost:27017/birthday-love`

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/birthday-love?retryWrites=true&w=majority`
- Update `.env` file:
```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/birthday-love?retryWrites=true&w=majority
PORT=5000
```

4. **Start the server:**
```bash
npm start
```

5. **Visit the site:**
Open your browser and go to `http://localhost:5000`

The website will automatically initialize with sample data when first loaded!

## 📁 Project Structure

```
project/
├── server.js                 # Main Express server
├── package.json              # Dependencies
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── models/
│   ├── LoveNote.js         # Love notes schema
│   ├── Memory.js           # Memories schema
│   ├── Message.js          # Messages schema
│   ├── VisitCounter.js     # Visit counter schema
│   └── SecretMessage.js    # Secret messages schema
├── routes/
│   ├── notes.js            # Love notes API routes
│   ├── memories.js         # Memories API routes
│   ├── messages.js         # Messages API routes
│   └── visits.js           # Visits & secret messages routes
└── public/
    └── index.html          # Frontend (HTML + CSS + JS)
```

## 🔌 API Endpoints

### Love Notes API
- `GET /api/lovenote` - Get a random love note
- `GET /api/lovenotes` - Get all love notes
- `POST /api/lovenote` - Add a new love note

### Memories API
- `GET /api/memories` - Get all memories
- `GET /api/memory/:id` - Get specific memory
- `POST /api/memory` - Add a new memory

### Messages API
- `GET /api/messages` - Get all messages
- `POST /api/message` - Add a new message

### Visits & Secrets API
- `GET /api/visits` - Get/increment visit counter
- `GET /api/secret` - Get a random secret message
- `POST /api/secret` - Add a secret message

### Database Initialization
- `GET /api/init-data` - Initialize with sample data

## 💌 Using the Features

### Adding Love Notes

**Via API (curl):**
```bash
curl -X POST http://localhost:5000/api/lovenote \
  -H "Content-Type: application/json" \
  -d '{"message": "Your smile brightens my world", "emoji": "💖"}'
```

**In JavaScript:**
```javascript
fetch('/api/lovenote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "I love you more each day",
    emoji: "❤️"
  })
})
```

### Adding Memories

```bash
curl -X POST http://localhost:5000/api/memory \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Our First Date",
    "message": "The best day of my life",
    "image": "📷"
  }'
```

### Adding Messages

```bash
curl -X POST http://localhost:5000/api/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Happy Birthday my love", "emoji": "💌"}'
```

### Adding Secret Messages

```bash
curl -X POST http://localhost:5000/api/secret \
  -H "Content-Type: application/json" \
  -d '{"message": "You are my forever", "emoji": "🎁"}'
```

## 🎯 Features Walkthrough

### 1. **Show Me A Love Message** ❤️
- Click the button in the gallery or messages section
- A romantic modal appears with a random love note from the database
- Beautiful animations and confetti celebration
- Auto-closes after 8 seconds

### 2. **Memory Gallery** 📸
- Displays memories from the database
- Shows title, message, and emoji for each memory
- Updates dynamically when you add new memories

### 3. **Birthday Messages** 💌
- Displays all stored messages from the database
- Shows up in the "Sweet Messages For You" section
- Add new messages via API or in your admin panel

### 4. **Secret Message** 🎁
- Click "Click For Your Birthday Surprise 🎁❤️"
- Fetches a special secret message from the database
- Shows with romantic animations and effects

### 5. **Visit Counter** 💕
- Appears in the bottom-right corner
- Increments each time the site is visited
- Shows: "You have visited 💕 X times ❤️"

## 🛠️ Customization

### Change the MongoDB Connection
Edit `.env`:
```env
MONGO_URI=your_mongodb_connection_string
```

### Add Sample Data
The site initializes automatically with sample data. To add more, use the API endpoints with curl or a REST client like Postman.

### Customize the Port
Edit `.env`:
```env
PORT=3000
```

### Modify Animations
All animations are in the HTML `<style>` section. Customize colors, timing, and effects as needed.

## 📱 MongoDB Collections

### LoveNote
```json
{
  "_id": ObjectId,
  "message": "String",
  "emoji": "String",
  "date": Date
}
```

### Memory
```json
{
  "_id": ObjectId,
  "title": "String",
  "message": "String",
  "image": "String (emoji or URL)",
  "date": Date
}
```

### Message
```json
{
  "_id": ObjectId,
  "message": "String",
  "emoji": "String",
  "date": Date
}
```

### SecretMessage
```json
{
  "_id": ObjectId,
  "message": "String",
  "emoji": "String",
  "date": Date
}
```

### VisitCounter
```json
{
  "_id": ObjectId,
  "count": Number,
  "lastVisit": Date
}
```

## 🚨 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify `.env` has correct `MONGO_URI`
- For Atlas, check IP whitelist settings

### Port Already in Use
- Change `PORT` in `.env`
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### Modules Not Found
- Run `npm install` again
- Clear cache: `npm cache clean --force`

### CSS/JS Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure you moved `index.html` to `public/` folder
- Check server logs for errors

## 💡 Tips & Tricks

1. **Pre-fill the Database:**
   Use the API to add your own love notes, memories, and messages before showing it to her

2. **Mobile Testing:**
   Use Chrome DevTools (F12) → Toggle device toolbar to test on different screens

3. **Add Real Images:**
   Replace emoji placeholders with actual image URLs in memories

4. **Deploy to Heroku/Railway:**
   The app is ready to deploy! Just push to your hosting service

5. **Backup Your Data:**
   Regularly export your MongoDB collections to ensure you don't lose memories

## 🎨 Customization Ideas

- Add more animations and effects
- Create a password-protected admin page to manage content
- Add a comments section
- Create a countdown timer to special dates
- Add photo upload functionality
- Create playlists or music integration
- Add a guestbook for friends & family

## 📞 Support

If you encounter any issues:
1. Check the browser console (F12 → Console)
2. Check server logs in terminal
3. Verify MongoDB connection
4. Make sure `.env` file is configured correctly

## 🎁 Made with ❤️

This project is designed to make your girlfriend feel extra special on her birthday. Pour your heart into the messages and memories you add!

Happy Birthday to your amazing girlfriend! 🎊💖
