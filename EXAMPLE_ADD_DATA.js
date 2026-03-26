// ===== EXAMPLE: How to Add Data to Your Database =====
// You can use this as a template with any REST client or run it in Node.js

// Option 1: Using curl in terminal
// ================================

// Add a Love Note:
// curl -X POST http://localhost:5000/api/lovenote \
//   -H "Content-Type: application/json" \
//   -d '{
//     "message": "You are my greatest blessing",
//     "emoji": "💖"
//   }'

// Add a Memory:
// curl -X POST http://localhost:5000/api/memory \
//   -H "Content-Type: application/json" \
//   -d '{
//     "title": "That Perfect Sunset 🌅",
//     "message": "Watching the sunset with you felt like a dream",
//     "image": "🌅"
//   }'

// Add a Message:
// curl -X POST http://localhost:5000/api/message \
//   -H "Content-Type: application/json" \
//   -d '{
//     "message": "You are my person, forever and always",
//     "emoji": "💌"
//   }'

// Add a Secret Message:
// curl -X POST http://localhost:5000/api/secret \
//   -H "Content-Type: application/json" \
//   -d '{
//     "message": "In case you forget - I am absolutely crazy about you",
//     "emoji": "🎁"
//   }'

// ================================
// Option 2: Using JavaScript/Fetch
// ================================

async function addLoveNote() {
  const response = await fetch('/api/lovenote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: "Every day with you is a blessing",
      emoji: "❤️"
    })
  });
  const data = await response.json();
  console.log('Love note added:', data);
}

async function addMemory() {
  const response = await fetch('/api/memory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: "Our First Kiss 💋",
      message: "The moment my heart knew you were the one",
      image: "💋"
    })
  });
  const data = await response.json();
  console.log('Memory added:', data);
}

async function addMessage() {
  const response = await fetch('/api/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: "Thank you for making me the happiest person alive",
      emoji: "💕"
    })
  });
  const data = await response.json();
  console.log('Message added:', data);
}

async function addSecretMessage() {
  const response = await fetch('/api/secret', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: "You are my forever, my always, my everything",
      emoji: "🎁"
    })
  });
  const data = await response.json();
  console.log('Secret message added:', data);
}

// Run these in browser console (F12) while the site is open:
// addLoveNote();
// addMemory();
// addMessage();
// addSecretMessage();

// ================================
// Sample Data to Add
// ================================

const sampleLoveNotes = [
  { message: "You make my heart skip a beat every time I see you", emoji: "💗" },
  { message: "Forever isn't long enough with you", emoji: "♾️" },
  { message: "You are my greatest adventure", emoji: "🗺️" },
  { message: "My favorite place is in your arms", emoji: "🫂" },
  { message: "You are my dream come true", emoji: "✨" }
];

const sampleMemories = [
  {
    title: "Our First Road Trip 🚗",
    message: "Got lost but found each other all over again",
    image: "🚗"
  },
  {
    title: "Rainy Day At Home ☔",
    message: "Cuddled up watching movies, perfect moment",
    image: "☔"
  },
  {
    title: "Stargazing Together ⭐",
    message: "You were more beautiful than all the stars",
    image: "⭐"
  },
  {
    title: "Cooking Together 👨‍🍳",
    message: "Made a mess but created the best memories",
    image: "👨‍🍳"
  }
];

const sampleMessages = [
  { message: "On your birthday, I want you to know how special you are to me", emoji: "🎂" },
  { message: "Every moment with you is a gift I cherish", emoji: "🎁" },
  { message: "You are my reason to smile every single day", emoji: "😊" },
  { message: "Forever with you doesn't seem long enough", emoji: "💕" }
];

const sampleSecrets = [
  { message: "You are the best decision I've ever made", emoji: "🎁" },
  { message: "I love you more than I ever thought possible", emoji: "💝" },
  { message: "You are my happy place, my safe haven", emoji: "🏠" },
  { message: "Thank you for being exactly who I needed", emoji: "❤️" }
];

// To add multiple items at once:
// sampleLoveNotes.forEach(note => {
//   fetch('/api/lovenote', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(note)
//   });
// });
