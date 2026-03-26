const mongoose = require('mongoose');

const QuizResponseSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    selectedAnswer: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('QuizResponse', QuizResponseSchema);
