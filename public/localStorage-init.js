// ===== FRONTEND-ONLY LOCALSTORAGE INITIALIZATION =====
// This script initializes all data in localStorage for a fully frontend-based application

(function initializeApp() {
    // Check if data is already initialized
    if (localStorage.getItem('app_initialized')) {
        console.log('✅ App data already initialized');
        return;
    }

    // Initialize sample data
    const initialData = {
        app_initialized: true,
        visit_count: 1,
        lastVisit: new Date().toISOString(),
        authenticated: false,
        quiz_score: 0,
        quiz_answers: []
    };

    // Save initial data
    Object.keys(initialData).forEach(key => {
        localStorage.setItem(key, JSON.stringify(initialData[key]));
    });

    console.log('✅ App initialized with localStorage');
})();

// ===== UTILITY FUNCTIONS FOR LOCALSTORAGE =====

// Get visit count
function getVisitCount() {
    let count = localStorage.getItem('visit_count');
    count = count ? parseInt(JSON.parse(count)) : 0;
    count++;
    localStorage.setItem('visit_count', JSON.stringify(count));
    return count;
}

// Save quiz response
function saveQuizResponse(question, answer) {
    try {
        let responses = localStorage.getItem('quiz_answers') ? JSON.parse(localStorage.getItem('quiz_answers')) : [];
        responses.push({ question, answer, timestamp: new Date().toISOString() });
        localStorage.setItem('quiz_answers', JSON.stringify(responses));
        console.log('✅ Quiz answer saved:', answer);
        return true;
    } catch (e) {
        console.error('Error saving quiz response:', e);
        return false;
    }
}

// Get a random love note (client-side, no DB)
function getRandomLoveNote() {
    const notes = [
        "You are my favorite person in the world ❤️",
        "I am lucky to call you mine 🥰",
        "You make my heart skip a beat every single day 💕",
        "My life started when you came into it ✨",
        "You are my greatest adventure 🗺️",
        "I love you more than words can express 💖",
        "You are my person, forever and always 👑",
        "Thank you for being exactly who I needed 🙏",
        "You complete me in every way possible 💑",
        "My favorite place is in your arms 🫂",
        "Your smile is my favorite thing to see 😊",
        "The way you make me laugh is pure magic 😂",
        "You are the reason I smile every day ☀️",
        "Your happiness is my happiness 🌈",
        "Being with you feels like coming home 🏠",
        "You make ordinary days extraordinary 🌟",
        "My heart smiles when I see your name 💝",
        "You are my sunshine on dark days ☀️",
        "Every moment with you is a blessing 🙏",
        "Your presence alone makes my day better 💫"
    ];
    return notes[Math.floor(Math.random() * notes.length)];
}

// Get random secret message
function getRandomSecretMessage() {
    const messages = [
        "You are my greatest treasure 💎",
        "I fall in love with you more each day 💕",
        "You make life beautiful 🌹",
        "I am forever yours ❤️",
        "You are my soulmate 👻",
        "I adore you completely 🥰",
        "You are my forever 💫",
        "I love you endlessly 🌊",
        "You are my biggest blessing 🙏",
        "Forever and always yours 💍"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

// Check authentication status (client-side only)
function checkAuth() {
    return localStorage.getItem('authenticated') === 'true';
}

// Logout function
function logout() {
    localStorage.removeItem('authenticated');
    window.location.href = '/login.html';
}

console.log('✅ LocalStorage utilities loaded');
